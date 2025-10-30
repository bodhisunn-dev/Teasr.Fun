import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'development-jwt-secret-change-in-production';

export interface AccessTokenPayload {
  postId: string;
  userId: string;
  type: 'media' | 'comment';
}

/**
 * Generate a short-lived access token for decrypted content
 * Token is valid for 1 hour
 */
export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
}

/**
 * Verify and decode an access token
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
}
