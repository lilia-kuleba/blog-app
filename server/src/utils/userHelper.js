import { User } from '../models/User.js';
import { Role } from '../models/Role.js';

async function getAllUsersWithRoles() {
  return User.findAll({
    include: Role,
  });
}

async function getUserWithRoles({ id, userName }) {
  return User.findOne({
    where: {
      ...(id && { id }),
      ...(userName && { userName }),
    },
    include: Role,
  });
}

export const userHelper = {
  getAllUsersWithRoles,
  getUserWithRoles,
};
