import {
  findRoutesByKingId,
  findRouteById,
  findSavedRoutesByUserId,
  findUserRoute,
  createUserRoute,
  deleteUserRoute,
} from '../repositories/route.repository.js';

export const getRoutesByKingService = async (kingId) => {
  if (!kingId) throw Object.assign(new Error('kingId가 필요합니다.'), { status: 400 });
  return await findRoutesByKingId(kingId);
};

export const getRouteByIdService = async (routeId) => {
  const route = await findRouteById(routeId);
  if (!route) throw Object.assign(new Error('해당 루트를 찾을 수 없습니다.'), { status: 404 });
  return route;
};

export const getMySavedRoutesService = async (userId) => {
  return await findSavedRoutesByUserId(userId);
};

export const saveRouteService = async (userId, routeId) => {
  const route = await findRouteById(routeId);
  if (!route) throw Object.assign(new Error('해당 루트를 찾을 수 없습니다.'), { status: 404 });

  const existing = await findUserRoute(userId, routeId);
  if (existing) throw Object.assign(new Error('이미 저장한 루트입니다.'), { status: 409 });

  return await createUserRoute(userId, routeId);
};

export const unsaveRouteService = async (userId, routeId) => {
  const existing = await findUserRoute(userId, routeId);
  if (!existing) throw Object.assign(new Error('저장된 루트를 찾을 수 없습니다.'), { status: 404 });
  await deleteUserRoute(userId, routeId);
};
