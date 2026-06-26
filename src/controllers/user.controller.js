import { checkNicknameService, onboardingService, getMyProfileService, updateMyProfileService } from '../services/user.service.js';

export const checkNickname = async (req, res, next) => {
  try {
    const { nickname } = req.query;
    const isDuplicate = await checkNicknameService(nickname);
    res.status(200).json({ success: true, data: { isDuplicate } });
  } catch (err) {
    next(err);
  }
};

export const onboarding = async (req, res, next) => {
  try {
    const result = await onboardingService(req.user.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

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
