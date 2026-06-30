import { getAllKingsService, getKingByIdService } from '../services/king.service.js';
import { success } from '../utils/response.js';

export const getAllKings = async (req, res, next) => {
  try {
    const result = await getAllKingsService(req.user.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getKingById = async (req, res, next) => {
  try {
    const result = await getKingByIdService(Number(req.params.kingId), req.user.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
};
