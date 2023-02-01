import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});