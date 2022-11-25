import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { User } from "./User.js";

export const Role = sequelize.define('role', {
  id: {
    type: DataTypes.UUID,
    unique: false,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

User.belongsToMany(Role, { through: 'User_Roles' });
Role.belongsToMany(User, { through: 'User_Roles' });