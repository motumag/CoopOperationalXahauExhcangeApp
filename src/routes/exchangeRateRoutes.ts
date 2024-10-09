import express from 'express';
import { getLatestForexRate,tradeServiceCreateRate} from '../contollers/ExchangeRateController';
import { validateForexRateCreation} from '../validations/validation';
import {authenticateJWT} from '../middlewares/jwtAuthentication';

const router = express.Router();
// router.get('/latestExchange', authenticateJWT, getLatestForexRate);
router.get('/latestExchange', getLatestForexRate);
router.post('/create-forex-rate', authenticateJWT, validateForexRateCreation, tradeServiceCreateRate);

export default router;