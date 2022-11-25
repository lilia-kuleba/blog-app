import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
