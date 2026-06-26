import { findAllKings, findKingById } from '../repositories/king.repository.js';
import { findCollectionsByUserId } from '../repositories/collection.repository.js';

export const getAllKingsService = async (userId) => {
  const [kings, collections] = await Promise.all([findAllKings(), findCollectionsByUserId(userId)]);
  const collectedKingIds = new Set(collections.map((c) => c.kingId));
  const mapped = kings.map((k) => ({
    ...k,
    tags: k.tags.map((t) => t.tag),
    isCollected: collectedKingIds.has(k.id),
  }));
  const collectionRate = Math.round((collectedKingIds.size / kings.length) * 100);
  return { kings: mapped, collectionRate };
};

export const getKingByIdService = async (kingId) => {
  const king = await findKingById(kingId);
  if (!king) throw Object.assign(new Error('해당 왕을 찾을 수 없습니다.'), { status: 404 });
  return { ...king, tags: king.tags.map((t) => t.tag) };
};
