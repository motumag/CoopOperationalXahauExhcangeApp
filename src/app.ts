import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import { connectDB,sequelize } from './config/dbConfig';
import {startForexRateScheduler} from './contollers/ExchangeRateController'

const app = express();
// Middleware for parsing JSON
app.use(express.json());

// DB connection and migration part
connectDB().then(async () => {
    console.log('Database connection established.');
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true }); 
    console.log('All models were synchronized successfully.');
   // Start the cron job for fetching forex rates every minute
   startForexRateScheduler(); 
  }).catch((error) => {
    console.error('Database connection failed:', error);
  });
// user routes 
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
