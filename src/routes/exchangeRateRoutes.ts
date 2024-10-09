import express from 'express';
import { getLatestForexRate,tradeServiceCreateRate} from '../contollers/ExchangeRateController';
import { validateForexRateCreation} from '../validations/validation';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import {authenticateJWT} from '../middlewares/jwtAuthentication';

const router = express.Router();
// router.get('/latestExchange', authenticateJWT, getLatestForexRate);
router.get('/latestExchange', loggerMiddleware,getLatestForexRate);
router.post('/create-forex-rate', authenticateJWT, loggerMiddleware,validateForexRateCreation, tradeServiceCreateRate);

export default router;