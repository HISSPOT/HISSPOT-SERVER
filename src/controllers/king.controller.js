import { getAllKingsService, getKingByIdService } from '../services/king.service.js';

export const getAllKings = async (req, res, next) => {
  try {
    const result = await getAllKingsService();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getKingById = async (req, res, next) => {
  try {
    const result = await getKingByIdService(Number(req.params.kingId));
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
