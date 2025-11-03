// backend/src/auth/tokens.ts
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import type { Role } from '../data/store';

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error('JWT_SECRET is missing (configure it in backend/.env)');
}
const JWT_SECRET: Secret = rawSecret;

// Typage propre pour expiresIn (ce que jsonwebtoken accepte)
const JWT_EXPIRES: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES ?? '15m') as SignOptions['expiresIn'];

export function signAccess(userId: string, role: Role) {
  return jwt.sign({ sub: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}
