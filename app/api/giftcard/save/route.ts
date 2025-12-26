import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { imageData, recipientName, senderName, message, stickerType } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    // Store metadata in MongoDB (optional - for analytics)
    try {
      const db = await getDatabase();
      await db.collection('giftcards').insertOne({
        recipientName,
        senderName,
        message,
        stickerType,
        createdAt: new Date(),
      });
    } catch (dbError) {
      // Continue even if DB fails - card generation should still work
      console.error('DB save error (non-critical):', dbError);
    }

    // Return the image data URL directly - no filesystem needed
    return NextResponse.json({
      success: true,
      imageUrl: imageData, // Return the base64 data URL directly
    });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Failed to save gift card' },
      { status: 500 }
    );
  }
}
}
