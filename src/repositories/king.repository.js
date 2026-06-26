import prisma from '../config/prisma.js';

export const findAllKings = () =>
  prisma.king.findMany({ include: { tags: true }, orderBy: { orderNumber: 'asc' } });

export const findKingById = (id) =>
  prisma.king.findUnique({ where: { id }, include: { tags: true } });
