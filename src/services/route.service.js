import { findAllRoutes, findRouteById, createRouteHistory, findRouteHistoryByUserAndRoute } from '../repositories/route.repository.js';

export const getAllRoutesService = async () => {
  return await findAllRoutes();
};

export const getRouteByIdService = async (routeId) => {
  const route = await findRouteById(routeId);
  if (!route) throw Object.assign(new Error('해당 루트를 찾을 수 없습니다.'), { status: 404 });
  return route;
};

export const completeRouteService = async (userId, routeId) => {
  const route = await findRouteById(routeId);
  if (!route) throw Object.assign(new Error('해당 루트를 찾을 수 없습니다.'), { status: 404 });

  const existing = await findRouteHistoryByUserAndRoute(userId, routeId);
  if (existing) throw Object.assign(new Error('이미 완주한 루트입니다.'), { status: 409 });

  return await createRouteHistory(userId, routeId);
};
