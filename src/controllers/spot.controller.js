import { getSpotsByKingService, getNearbySpotService, checkDistanceService } from '../services/spot.service.js';

export const getSpotsByKing = async (req, res, next) => {
  try {
    const result = await getSpotsByKingService(Number(req.query.kingId));
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getNearbySpots = async (req, res, next) => {
  try {
    const result = await getNearbySpotService(Number(req.params.spotId));
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const checkDistance = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const result = await checkDistanceService(Number(req.params.spotId), latitude, longitude);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
