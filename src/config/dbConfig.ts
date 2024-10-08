import { Sequelize } from 'sequelize';

// Create a new instance of Sequelize with your database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME || 'xrp-coop',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'momo@123',
  {
    host: process.env.DB_HOST || 'localhost', 
    dialect: 'postgres',                    
    port: Number(process.env.DB_PORT) || 5432 
  }
);
// Function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
export { sequelize, connectDB };
