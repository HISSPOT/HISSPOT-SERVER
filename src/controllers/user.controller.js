import { getMyProfileService, updateMyProfileService, deleteMyAccountService } from '../services/user.service.js';

export const getMyProfile = async (req, res, next) => {
  try {
    const result = await getMyProfileService(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const result = await updateMyProfileService(req.user.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const deleteMyAccount = async (req, res, next) => {
  try {
    await deleteMyAccountService(req.user.id);
    res.status(200).json({ success: true, message: '회원 탈퇴가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};
