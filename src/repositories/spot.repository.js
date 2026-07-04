import prisma from '../config/prisma.js';

export const findSpotsByKingId = (kingId) =>
  prisma.spot.findMany({
    where: {
      kingSpots: {
        some: { kingId }
      }
    }
  });

export const findAllKingSpots = () =>
  prisma.kingSpot.findMany({
    select: { kingId: true, spot: { select: { id: true, latitude: true, longitude: true } } },
    orderBy: { kingId: 'asc' }
  });

export const findKingSpotByKingId = (kingId) =>
  prisma.kingSpot.findMany({
    where: { kingId },
    include: { spot: true }
  });

export const findSpotById = (id) =>
  prisma.spot.findUnique({ where: { id } });
