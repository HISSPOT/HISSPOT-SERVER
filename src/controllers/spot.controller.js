import { getNearbySpotService, getSpotByIdService } from '../services/spot.service.js';

export const getNearbySpots = async (req, res, next) => {
  try {
    const { lat, lng, radius } = req.query;
    const result = await getNearbySpotService(Number(lat), Number(lng), Number(radius) || 1.0);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getSpotById = async (req, res, next) => {
  try {
    const result = await getSpotByIdService(Number(req.params.spotId));
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
