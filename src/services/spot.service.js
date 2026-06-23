import { findNearbySpots, findSpotById } from '../repositories/spot.repository.js';

// Haversine 공식으로 두 좌표 간 거리(km) 계산
const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const getNearbySpotService = async (lat, lng, radiusKm) => {
  const spots = await findNearbySpots(lat, lng, radiusKm);
  return spots.map((spot) => ({
    ...spot,
    distance: haversineDistance(lat, lng, spot.latitude, spot.longitude),
  }));
};

export const getSpotByIdService = async (spotId) => {
  const spot = await findSpotById(spotId);
  if (!spot) throw Object.assign(new Error('해당 장소를 찾을 수 없습니다.'), { status: 404 });
  return spot;
};
