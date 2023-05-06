import crypto from 'crypto';

export function encrypt(password: string) {
  const encrypted = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64');
  return encrypted;
}