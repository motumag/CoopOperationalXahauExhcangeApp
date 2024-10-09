import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';

class ForexRate extends Model {}
ForexRate.init(
  {
    forex_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mid_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    buy_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sell_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    active_bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'MIDDLEWARE', 
      },
    //   updatedBy: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ForexRate',
    tableName: 'forex_rates',
    timestamps: false,
  }
);

export default ForexRate;
