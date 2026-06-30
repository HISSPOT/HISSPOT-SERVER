import { collectKingService } from '../services/collection.service.js';
import { success } from '../utils/response.js';

export const collectKing = async (req, res, next) => {
  try {
    const result = await collectKingService(req.user.id, Number(req.params.kingId));
    success(res, result, 201);
  } catch (err) {
    next(err);
  }
};
