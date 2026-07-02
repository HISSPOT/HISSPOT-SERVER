import { getSpotsByKingService, getAllSpotsService, getNearbySpotService, checkDistanceService } from '../services/spot.service.js';
import { success } from '../utils/response.js';

export const getSpotsByKing = async (req, res, next) => {
  try {
    const result = req.query.kingId
      ? await getSpotsByKingService(Number(req.query.kingId))
      : await getAllSpotsService(req.user.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getNearbySpots = async (req, res, next) => {
  try {
    const result = await getNearbySpotService(Number(req.params.spotId));
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const checkDistance = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const result = await checkDistanceService(Number(req.params.spotId), latitude, longitude);
    success(res, result);
  } catch (err) {
    next(err);
  }
};
