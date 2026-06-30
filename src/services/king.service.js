import { findAllKings, findKingById } from '../repositories/king.repository.js';
import { findCollectionsByUserId } from '../repositories/collection.repository.js';

const getKingImageUrl = (king) => {
  if (king.imageUrl) return king.imageUrl;
  const padded = String(king.orderNumber).padStart(2, '0');
  return `/images/kings/character_js_king_${padded}.png`;
};

export const getAllKingsService = async (userId) => {
  const [kings, collections] = await Promise.all([findAllKings(), findCollectionsByUserId(userId)]);
  const collectedKingIds = new Set(collections.map((c) => c.kingId));
  const mapped = kings.map((k) => ({
    ...k,
    imageUrl: getKingImageUrl(k),
    tags: k.tags ? [k.tags.tag1, k.tags.tag2, k.tags.tag3, k.tags.tag4, k.tags.tag5, k.tags.tag6].filter(Boolean) : [],
    isCollected: collectedKingIds.has(k.id),
  }));
  const collectionRate = Math.round((collectedKingIds.size / kings.length) * 100);
  return { kings: mapped, collectionRate };
};

export const getKingByIdService = async (kingId) => {
  const king = await findKingById(kingId);
  if (!king) throw Object.assign(new Error('해당 왕을 찾을 수 없습니다.'), { status: 404 });
  const tags = king.tags ? [king.tags.tag1, king.tags.tag2, king.tags.tag3, king.tags.tag4, king.tags.tag5, king.tags.tag6].filter(Boolean) : [];
  return { ...king, imageUrl: getKingImageUrl(king), tags };
};
