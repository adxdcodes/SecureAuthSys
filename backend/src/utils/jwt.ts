import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.js';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateTokens = (user: IUser) => {
  const payload: JWTPayload = {
    userId: (user._id as any).toString(),
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } as any
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' } as any
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, isRefresh = false): JWTPayload => {
  const secret = isRefresh 
    ? process.env.JWT_REFRESH_SECRET as string 
    : process.env.JWT_SECRET as string;
  
  return jwt.verify(token, secret) as JWTPayload;
};

export const generateSecureToken = (): string => {
  return jwt.sign(
    { random: Math.random() },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' } as any
  );
};
