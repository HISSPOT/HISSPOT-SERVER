import prisma from '../config/prisma.js';

export const findSpotsByKingId = (kingId) =>
  prisma.kingSpot.findMany({
    where: { kingId },
    include: { spot: true }
  });

export const findAllKingSpots = () =>
  prisma.kingSpot.findMany({
    select: { kingId: true, spot: { select: { id: true, latitude: true, longitude: true } } },
    orderBy: { kingId: 'asc' }
  });

export const findSpotById = (id) =>
  prisma.spot.findUnique({ where: { id } });
