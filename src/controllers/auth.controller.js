import { signUpService, signInService, reissueTokenService, signOutService } from '../services/auth.service.js';

export const signUp = async (req, res, next) => {
  try {
    const result = await signUpService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const result = await signInService(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const reissueToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await reissueTokenService(refreshToken);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req, res, next) => {
  try {
    await signOutService(req.user.id);
    res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
  } catch (err) {
    next(err);
  }
};
