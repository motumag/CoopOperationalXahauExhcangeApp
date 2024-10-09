import * as cron from 'node-cron';
import * as superagent from 'superagent';
import ForexRate from '../models/ForexRate';
import { Request, Response, NextFunction } from 'express';

const BANK_API_URL: string = 'http://10.1.230.6:7081/v1/cbo/';

const convertFloat = (value: string): number => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    throw new Error(`Invalid number format: ${value}`);
  }
  return num;
};
  // Schedule the cron job to run every minute
export const startForexRateScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const data = {
      CURRENCYRATESRequest: {
        ESBHeader: {
          serviceCode: '120000',
          channel: 'USSD',
          Service_name: 'fxchangeServices',
          Message_Id: Date.now().toString(36),
        },
        CURRENCYRATESType: [
          {
            columnName: 'CURRENCY.CODE',
            criteriaValue: 'USD',
            operand: 'EQ',
          },
        ],
      },
    };

    try {
      const response = await superagent.post(BANK_API_URL).send(data);
      const resultInfo = JSON.parse(response.text);
      if (
        resultInfo &&
        resultInfo.CURRENCYRATESResponse &&
        resultInfo.CURRENCYRATESResponse.ESBStatus?.status === 'Success'
      ) {
        const detailInfo =
          resultInfo.CURRENCYRATESResponse.CURRENCYRATESType.gCURRENCYRATESDetailType.mCURRENCYRATESDetailType.mCURRENCYRATESDetailType;
        
        const forexRateInfo = {
          mid_rate: convertFloat(detailInfo.MidRate),
          buy_rate: convertFloat(detailInfo.BuyRate),
          sell_rate: convertFloat(detailInfo.SellRate),
          active_bank: 'CBO',
          updated_at: new Date(),
        };
        // Insert or update the forex rate in PostgreSQL using Sequelize
        await ForexRate.upsert(forexRateInfo);
        console.log('Forex rates updated:', forexRateInfo);
      }
    } catch (error) {
      console.error('forexRateScheduler: error -', error);
    }
  });
};
export const getLatestForexRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const latestForexRate = await ForexRate.findOne({
        order: [['updated_at', 'DESC']],
      });
      if (!latestForexRate) {
        res.status(404).json({ message: 'No forex rates found.' });
        return;
      }
      res.status(200).json({ latestForexRate });
    } catch (error) {
      next(error);
    }
  };

 // Controller to create a new Forex rate
export const tradeServiceCreateRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mid_rate, buy_rate, sell_rate } = req.body;
      const newForexRate = await ForexRate.create({
        mid_rate,
        buy_rate,
        sell_rate,
        active_bank:"CBO",
        source: 'TRADESERVICE',
        updated_at: new Date(),
      });
      res.status(201).json({ message: 'Forex rate created successfully', data: newForexRate });
    } catch (error) {
      next(error);
    }
  };
