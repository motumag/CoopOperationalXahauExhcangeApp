import express from 'express';
import { getLatestForexRate} from '../contollers/ExchangeRateController';
// import { validateUserRegistration ,validateUserLogin} from '../validations/validation';
import {authenticateJWT} from '../middlewares/jwtAuthentication';

const router = express.Router();
// router.get('/latestExchange', authenticateJWT, getLatestForexRate);
router.get('/latestExchange', getLatestForexRate);
export default router;