import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, updateRefreshToken, clearRefreshToken } from '../repositories/user.repository.js';

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '14d',
  });
  return { accessToken, refreshToken };
};

export const signUpService = async ({ email, password, nickname }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw Object.assign(new Error('이미 사용 중인 이메일입니다.'), { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, nickname });

  const { accessToken, refreshToken } = generateTokens(user.id);
  await updateRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, userId: user.id, nickname: user.nickname };
};

export const signInService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw Object.assign(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'), { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw Object.assign(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'), { status: 401 });

  const { accessToken, refreshToken } = generateTokens(user.id);
  await updateRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, userId: user.id, nickname: user.nickname };
};

export const reissueTokenService = async (refreshToken) => {
  if (!refreshToken) throw Object.assign(new Error('리프레시 토큰이 필요합니다.'), { status: 400 });

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw Object.assign(new Error('유효하지 않은 리프레시 토큰입니다.'), { status: 401 });
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id);
  await updateRefreshToken(decoded.id, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

export const signOutService = async (userId) => {
  await clearRefreshToken(userId);
};
