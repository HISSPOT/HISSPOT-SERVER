import {
  getRoutesByKingService,
  getRouteByIdService,
  getMySavedRoutesService,
  saveRouteService,
  unsaveRouteService,
} from '../services/route.service.js';
import { success } from '../utils/response.js';

export const getRoutesByKing = async (req, res, next) => {
  try {
    const result = await getRoutesByKingService(Number(req.query.kingId));
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getRouteById = async (req, res, next) => {
  try {
    const result = await getRouteByIdService(Number(req.params.routeId));
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getMySavedRoutes = async (req, res, next) => {
  try {
    const result = await getMySavedRoutesService(req.user.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const saveRoute = async (req, res, next) => {
  try {
    const result = await saveRouteService(req.user.id, Number(req.params.routeId));
    success(res, result, 201);
  } catch (err) {
    next(err);
  }
};

export const unsaveRoute = async (req, res, next) => {
  try {
    await unsaveRouteService(req.user.id, Number(req.params.routeId));
    res.status(200).json({ success: true, message: '루트 저장이 취소되었습니다.' });
  } catch (err) {
    next(err);
  }
};
