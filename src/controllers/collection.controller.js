import { collectKingService } from '../services/collection.service.js';

export const collectKing = async (req, res, next) => {
  try {
    const result = await collectKingService(req.user.id, Number(req.params.kingId));
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
