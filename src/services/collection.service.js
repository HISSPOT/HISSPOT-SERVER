import { findCollectionByUserAndKing, createCollection } from '../repositories/collection.repository.js';
import { findKingById } from '../repositories/king.repository.js';
import { getKingImageUrl } from './king.service.js';

export const collectKingService = async (userId, kingId) => {
  const king = await findKingById(kingId);
  if (!king) throw Object.assign(new Error('해당 왕을 찾을 수 없습니다.'), { status: 404 });

  const existing = await findCollectionByUserAndKing(userId, kingId);
  if (existing) throw Object.assign(new Error('이미 수집한 왕입니다.'), { status: 409 });

  await createCollection(userId, kingId);

  const tags = king.tags
    ? [king.tags.tag1, king.tags.tag2, king.tags.tag3, king.tags.tag4, king.tags.tag5, king.tags.tag6].filter(Boolean)
    : [];
  return { ...king, imageUrl: getKingImageUrl(king), tags };
};
