export interface ScrapbookEntry {
  _id?: string;
  imageUrl: string;
  caption: string;
  memory2025: string;
  createdAt: Date;
}

export interface GiftCard {
  _id?: string;
  imageUrl: string;
  recipientName: string;
  message: string;
  stickerType: string;
  shareUrl: string;
  createdAt: Date;
}
