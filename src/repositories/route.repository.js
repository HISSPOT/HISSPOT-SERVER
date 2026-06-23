import prisma from '../config/prisma.js';

export const findAllRoutes = () =>
  prisma.route.findMany({
    include: { routeSpots: { include: { spot: true }, orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });

export const findRouteById = (id) =>
  prisma.route.findUnique({
    where: { id },
    include: { routeSpots: { include: { spot: { include: { king: true } } }, orderBy: { order: 'asc' } } },
  });

export const findRouteHistoryByUserAndRoute = (userId, routeId) =>
  prisma.routeHistory.findFirst({ where: { userId, routeId } });

export const createRouteHistory = (userId, routeId) =>
  prisma.routeHistory.create({ data: { userId, routeId } });
