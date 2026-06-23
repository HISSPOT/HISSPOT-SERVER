import { findAllKings, findKingById } from '../repositories/king.repository.js';

export const getAllKingsService = async () => {
  return await findAllKings();
};

export const getKingByIdService = async (kingId) => {
  const king = await findKingById(kingId);
  if (!king) throw Object.assign(new Error('해당 왕을 찾을 수 없습니다.'), { status: 404 });
  return king;
};
