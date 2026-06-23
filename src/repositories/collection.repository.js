import prisma from '../config/prisma.js';

export const findCollectionsByUserId = (userId) =>
  prisma.collection.findMany({
    where: { userId },
    include: { king: true },
    orderBy: { collectedAt: 'desc' },
  });

export const findCollectionByUserAndKing = (userId, kingId) =>
  prisma.collection.findUnique({ where: { userId_kingId: { userId, kingId } } });

export const createCollection = (userId, kingId) =>
  prisma.collection.create({ data: { userId, kingId }, include: { king: true } });
