import { userHelper } from '../utils/userHelper.js';
import { ApiError } from '../exceptions/ApiError.js';
import { userNormalize } from './userService.js';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';

async function getAllUsers({ userId }) {
  const user = await userHelper.getUserWithRoles({ id: userId });
  const roles = user.roles.map(role => role.roleName);
  console.log(user.roles);
  console.log(user.roles.some(role => role.roleName === 'admin'));

  if (!roles.includes('admin')) {
    throw ApiError.BadRequest('Access denied');
  }

  const users = await userHelper.getAllUsersWithRoles();
  console.log(users);

  return users.map(userNormalize);
}

async function deleteUser({ adminId, userId }) {
  const admin = await userHelper.getUserWithRoles({
    id: adminId,
  });
  const user = await userHelper.getUserWithRoles({
    id: userId,
  });

  if (
    !admin ||
    !admin.roles.map(role => role.roleName).includes('admin') ||
    user.roles.map(role => role.roleName).includes('admin')
  ) {
    throw ApiError.Unauthorized();
  }

  await User.destroy({
    where: {
      id: userId,
    },
  });
}

async function promoteUser({ adminId, userId }) {
  const admin = await userHelper.getUserWithRoles({
    id: adminId,
  });
  const user = await userHelper.getUserWithRoles({
    id: userId,
  });

  if (!admin || !user) {
    throw ApiError.BadRequest('User or admin do not exist');
  }

  if (
    !admin.roles.map(role => role.roleName).includes('admin')
  ) {
    throw ApiError.Unauthorized();
  }

  if (user.roles.map(role => role.roleName).includes('admin')) {
    throw ApiError.BadRequest('User is already admin');
  }

  const adminRole = await Role.findOne({
    where: {
      roleName: 'admin',
    },
  });
  await user.addRole(adminRole);
}

export const adminService = {
  getAllUsers,
  deleteUser,
  promoteUser,
};
