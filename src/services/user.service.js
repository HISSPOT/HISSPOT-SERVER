import { findUserById, findUserByNickname, updateUser, deleteUser } from '../repositories/user.repository.js';

export const checkNicknameService = async (nickname) => {
  if (!nickname) throw Object.assign(new Error('nickname이 필요합니다.'), { status: 400 });
  const user = await findUserByNickname(nickname);
  return !!user;
};

export const onboardingService = async (userId, { nickname, profileImageUrl }) => {
  if (!nickname) throw Object.assign(new Error('nickname이 필요합니다.'), { status: 400 });

  const updated = await updateUser(userId, { nickname, profileImageUrl, isOnboarded: true });
  const { kakaoId, ...safeUser } = updated;
  return safeUser;
};

export const getMyProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw Object.assign(new Error('사용자를 찾을 수 없습니다.'), { status: 404 });
  const { kakaoId, ...safeUser } = user;
  return safeUser;
};

export const updateMyProfileService = async (userId, data) => {
  const { nickname, profileImageUrl } = data;
  const updated = await updateUser(userId, { nickname, profileImageUrl });
  const { kakaoId, ...safeUser } = updated;
  return safeUser;
};

export const deleteMyAccountService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw Object.assign(new Error('사용자를 찾을 수 없습니다.'), { status: 404 });
  await deleteUser(userId);
};
