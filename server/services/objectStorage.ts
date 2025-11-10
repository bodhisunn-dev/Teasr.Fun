
import { Client } from '@replit/object-storage';

// Initialize Replit Object Storage client only if bucket is configured
let client: Client | null = null;

try {
  client = new Client();
} catch (error) {
  console.warn('Object Storage not configured, using local filesystem');
}

export async function saveToObjectStorage(key: string, data: Buffer): Promise<void> {
  if (!client) {
    throw new Error('Object Storage not configured');
  }
  await client.uploadFromBytes(key, data);
}

export async function getFromObjectStorage(key: string): Promise<Buffer> {
  if (!client) {
    throw new Error('Object Storage not configured');
  }
  const bytes = await client.downloadAsBytes(key);
  return Buffer.from(bytes);
}

export async function deleteFromObjectStorage(key: string): Promise<void> {
  if (!client) {
    throw new Error('Object Storage not configured');
  }
  await client.delete(key);
}

export async function existsInObjectStorage(key: string): Promise<boolean> {
  if (!client) {
    return false;
  }
  try {
    await client.downloadAsBytes(key);
    return true;
  } catch {
    return false;
  }
}
