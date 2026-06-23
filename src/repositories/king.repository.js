import prisma from '../config/prisma.js';

export const findAllKings = () =>
  prisma.king.findMany({ orderBy: { orderNum: 'asc' } });

export const findKingById = (id) =>
  prisma.king.findUnique({ where: { id }, include: { spots: true } });
