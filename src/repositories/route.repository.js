import prisma from '../config/prisma.js';

const routeInclude = {
  routeSpots: {
    include: { spot: true },
    orderBy: { orderNumber: 'asc' },
  },
};

export const findRoutesByKingId = (kingId) =>
  prisma.route.findMany({ where: { kingId }, include: routeInclude });

export const findRouteById = (id) =>
  prisma.route.findUnique({ where: { id }, include: routeInclude });

export const findSavedRoutesByUserId = (userId) =>
  prisma.userRoute.findMany({
    where: { userId },
    include: { route: { include: routeInclude } },
    orderBy: { savedAt: 'desc' },
  });

export const findUserRoute = (userId, routeId) =>
  prisma.userRoute.findUnique({ where: { userId_routeId: { userId, routeId } } });

export const createUserRoute = (userId, routeId) =>
  prisma.userRoute.create({ data: { userId, routeId } });

export const deleteUserRoute = (userId, routeId) =>
  prisma.userRoute.delete({ where: { userId_routeId: { userId, routeId } } });
