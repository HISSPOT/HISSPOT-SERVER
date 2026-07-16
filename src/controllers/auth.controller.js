import { kakaoLoginService, appleLoginService, logoutService } from '../services/auth.service.js';
import { success } from '../utils/response.js';

export const kakaoLogin = async (req, res, next) => {
  try {
    const { kakaoAccessToken } = req.body;
    const result = await kakaoLoginService(kakaoAccessToken);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const appleLogin = async (req, res, next) => {
  try {
    const { appleIdentityToken } = req.body;
    const result = await appleLoginService(appleIdentityToken);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutService(req.user.id);
    res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
  } catch (err) {
    next(err);
  }
};

import jwt from 'jsonwebtoken';
import { findUserById, createUser } from '../repositories/user.repository.js';

export const devLogin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let user = await findUserById(userId);
    if (!user) {
      user = await createUser({
        id: userId,
        kakaoId: `dev_${userId}`,
        nickname: `dev_user_${userId.slice(-4)}`,
        isOnboarded: true,
      });
    }
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    success(res, { accessToken, isOnboarded: user.isOnboarded });
  } catch (err) {
    next(err);
  }
};
