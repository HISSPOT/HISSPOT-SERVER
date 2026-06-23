import { findUserById, updateUser, deleteUser } from '../repositories/user.repository.js';

export const getMyProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw Object.assign(new Error('사용자를 찾을 수 없습니다.'), { status: 404 });
  const { password, refreshToken, ...safeUser } = user;
  return safeUser;
};

export const updateMyProfileService = async (userId, data) => {
  const updated = await updateUser(userId, data);
  const { password, refreshToken, ...safeUser } = updated;
  return safeUser;
};

export const deleteMyAccountService = async (userId) => {
  await deleteUser(userId);
};
