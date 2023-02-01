import { sequelize } from "../db.js";

import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
  id: {type: DataTypes.STRING, primaryKey: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
});

export const Words = sequelize.define('words', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  word: {type: DataTypes.STRING},
  translation: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER, defaultValue: 0}
});

User.hasOne(Words);
Words.belongsTo(User);

