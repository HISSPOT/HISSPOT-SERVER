import { findSpotsByKingId, findSpotById, findAllKingSpots } from '../repositories/spot.repository.js';
import { findCollectionsByUserId } from '../repositories/collection.repository.js';
import axios from 'axios';

const COLLECT_RADIUS_KM = 0.05;

const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const getSpotsByKingService = async (kingId) => {
  if (!kingId) throw Object.assign(new Error('kingId가 필요합니다.'), { status: 400 });
  const kingSpots = await findSpotsByKingId(kingId);
  return kingSpots.map(({ spot, tag1, tag2, tag3, tag4 }) => ({
    ...spot,
    tags: [tag1, tag2, tag3, tag4].filter(Boolean),
  }));
};

export const getAllSpotsService = async (userId) => {
  const [kingSpots, collections] = await Promise.all([findAllKingSpots(), findCollectionsByUserId(userId)]);
  const collectedKingIds = new Set(collections.map((c) => c.kingId));
  return kingSpots.map(({ kingId, spot }) => ({
    id: spot.id,
    latitude: spot.latitude,
    longitude: spot.longitude,
    kingId,
    isCollected: collectedKingIds.has(kingId),
  }));
};

const NEARBY_RADIUS_M = 2000;

export const getNearbySpotService = async (spotId) => {
  const spot = await findSpotById(spotId);
  if (!spot) throw Object.assign(new Error('해당 장소를 찾을 수 없습니다.'), { status: 404 });
  if (spot.latitude == null || spot.longitude == null)
    throw Object.assign(new Error('해당 장소에 좌표 정보가 없습니다.'), { status: 400 });

  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/locationBasedList2', {
    params: {
      serviceKey: process.env.TOUR_API_KEY,
      mapX: spot.longitude,
      mapY: spot.latitude,
      radius: NEARBY_RADIUS_M,
      MobileOS: 'ETC',
      MobileApp: 'Hisspot',
      _type: 'json',
      numOfRows: 4,
      pageNo: 1,
      contentTypeId: 12,
    }
  });

  const items = response.data?.response?.body?.items?.item ?? [];
  return items
    .filter((item) => item.contentid !== spot.contentId)
    .slice(0, 3)
    .map((item) => ({
      contentId: item.contentid,
      name: item.title,
      address: item.addr1,
      imageUrl: item.firstimage || item.firstimage2 || null,
      latitude: item.mapy,
      longitude: item.mapx,
    }));
};

export const checkDistanceService = async (spotId, userLat, userLng) => {
  const spot = await findSpotById(spotId);
  if (!spot) throw Object.assign(new Error('해당 장소를 찾을 수 없습니다.'), { status: 404 });
  if (spot.latitude == null || spot.longitude == null)
    throw Object.assign(new Error('해당 장소에 좌표 정보가 없습니다.'), { status: 400 });
  const distance = haversineDistance(userLat, userLng, spot.latitude, spot.longitude);
  return { isCollectable: distance <= COLLECT_RADIUS_KM, distance: Math.round(distance * 1000) / 1000 };
};
