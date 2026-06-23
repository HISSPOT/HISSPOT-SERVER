import { findCollectionsByUserId, createCollection, findCollectionByUserAndKing } from '../repositories/collection.repository.js';
import { findKingById } from '../repositories/king.repository.js';

export const getMyCollectionsService = async (userId) => {
  return await findCollectionsByUserId(userId);
};

export const collectKingService = async (userId, kingId) => {
  const king = await findKingById(kingId);
  if (!king) throw Object.assign(new Error('해당 왕을 찾을 수 없습니다.'), { status: 404 });

  const existing = await findCollectionByUserAndKing(userId, kingId);
  if (existing) throw Object.assign(new Error('이미 수집한 왕입니다.'), { status: 409 });

  return await createCollection(userId, kingId);
};
