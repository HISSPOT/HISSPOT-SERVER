import { getMyCollectionsService, collectKingService } from '../services/collection.service.js';

export const getMyCollections = async (req, res, next) => {
  try {
    const result = await getMyCollectionsService(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const collectKing = async (req, res, next) => {
  try {
    const result = await collectKingService(req.user.id, Number(req.params.kingId));
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
