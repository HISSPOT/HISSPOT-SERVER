import prisma from '../config/prisma.js';

export const findCollectionsByUserId = (userId) =>
  prisma.userCollection.findMany({ where: { userId } });

export const findCollectionByUserAndKing = (userId, kingId) =>
  prisma.userCollection.findUnique({ where: { userId_kingId: { userId, kingId } } });

export const createCollection = (userId, kingId) =>
  prisma.userCollection.create({ data: { userId, kingId }, include: { king: true } });
