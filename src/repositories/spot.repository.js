import prisma from '../config/prisma.js';

// 위도/경도 기반 근처 장소 조회 (bounding box 방식)
export const findNearbySpots = (lat, lng, radiusKm) => {
  const latDelta = radiusKm / 111;
  const lngDelta = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));

  return prisma.spot.findMany({
    where: {
      latitude: { gte: lat - latDelta, lte: lat + latDelta },
      longitude: { gte: lng - lngDelta, lte: lng + lngDelta },
    },
    include: { king: true },
  });
};

export const findSpotById = (id) =>
  prisma.spot.findUnique({ where: { id }, include: { king: true } });
