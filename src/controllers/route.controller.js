import { getAllRoutesService, getRouteByIdService, completeRouteService } from '../services/route.service.js';

export const getAllRoutes = async (req, res, next) => {
  try {
    const result = await getAllRoutesService();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getRouteById = async (req, res, next) => {
  try {
    const result = await getRouteByIdService(Number(req.params.routeId));
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const completeRoute = async (req, res, next) => {
  try {
    const result = await completeRouteService(req.user.id, Number(req.params.routeId));
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
