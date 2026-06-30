import { checkNicknameService, onboardingService, getMyProfileService, updateMyProfileService } from '../services/user.service.js';
import { success } from '../utils/response.js';

export const checkNickname = async (req, res, next) => {
  try {
    const { nickname } = req.query;
    const isDuplicate = await checkNicknameService(nickname);
    success(res, { isDuplicate });
  } catch (err) {
    next(err);
  }
};

export const onboarding = async (req, res, next) => {
  try {
    const result = await onboardingService(req.user.id, req.body);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const result = await getMyProfileService(req.user.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const result = await updateMyProfileService(req.user.id, req.body);
    success(res, result);
  } catch (err) {
    next(err);
  }
};
