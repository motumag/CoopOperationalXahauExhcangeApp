import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig'; 
import bcrypt from 'bcrypt';

// Define the User model
class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

   public async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password); 
  }
}
// Initialize the User model
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true, 
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
});

export default User;
