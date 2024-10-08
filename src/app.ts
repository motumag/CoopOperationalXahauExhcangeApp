import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import { connectDB,sequelize } from './config/dbConfig';

const app = express();
// Middleware for parsing JSON
app.use(express.json());

// DB connection and migration part
connectDB().then(async () => {
    console.log('Database connection established.');
    await sequelize.sync({ alter: true });  // Use `alter: true` for migrations
    // await sequelize.sync({ force: true }); 
    console.log('All models were synchronized successfully.');
  
  }).catch((error) => {
    console.error('Database connection failed:', error);
  });

// user routes 
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
