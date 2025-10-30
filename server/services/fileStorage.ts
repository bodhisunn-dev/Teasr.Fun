import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const THUMBNAILS_DIR = path.join(UPLOAD_DIR, 'thumbnails');

// Ensure directories exist
async function ensureDirs() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.mkdir(THUMBNAILS_DIR, { recursive: true });
}

ensureDirs();

export interface FileMetadata {
  filename: string;
  mimeType: string;
  size: number;
}

/**
 * Save encrypted file to disk
 */
export async function saveEncryptedFile(encryptedBuffer: Buffer, fileExtension: string): Promise<string> {
  const filename = `${crypto.randomUUID()}.${fileExtension}.enc`;
  const filepath = path.join(UPLOAD_DIR, filename);
  
  await fs.writeFile(filepath, encryptedBuffer);
  
  return filename;
}

/**
 * Read encrypted file from disk
 */
export async function readEncryptedFile(filename: string): Promise<Buffer> {
  const filepath = path.join(UPLOAD_DIR, filename);
  return fs.readFile(filepath);
}

/**
 * Generate blurred thumbnail from image buffer
 */
export async function generateBlurredThumbnail(imageBuffer: Buffer): Promise<string> {
  const filename = `thumb_${crypto.randomUUID()}.jpg`;
  const filepath = path.join(THUMBNAILS_DIR, filename);
  
  await sharp(imageBuffer)
    .resize(800, 800, { fit: 'cover' })
    .blur(40) // Heavy blur for pay-to-reveal effect
    .jpeg({ quality: 70 })
    .toFile(filepath);
  
  return `thumbnails/${filename}`;
}

/**
 * Get file extension from mime type
 */
export function getFileExtension(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
  };
  
  return mimeMap[mimeType] || 'bin';
}
