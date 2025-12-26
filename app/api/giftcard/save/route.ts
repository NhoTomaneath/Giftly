import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { imageData, recipientName, message, stickerType } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadsDir = join(process.cwd(), 'public', 'giftcards');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `giftcard-${uniqueSuffix}.png`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/giftcards/${filename}`;
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${imageUrl}`;

    const db = await getDatabase();
    const result = await db.collection('giftcards').insertOne({
      imageUrl,
      recipientName,
      message,
      stickerType,
      shareUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      imageUrl,
      shareUrl,
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Failed to save gift card' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const cards = await db
      .collection('giftcards')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gift cards' },
      { status: 500 }
    );
  }
}
