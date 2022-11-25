import { v4 as uuidv4 } from "uuid"
import { validateName, validatePassword } from "../utils/validation.js";
import { ApiError } from "../exceptions/ApiError.js";
import { Role } from "../models/Role.js";
import { User } from "../models/User.js";

async function register({ realName, userName, sex, secretWord, password }) {
  const errors = {
    realName: validateName(realName),
    userName: validateName(userName),
    password: validatePassword(password),
  };

  const foundedUser = await User.findOne({ where: { userName }});

  if (foundedUser) {
    errors.userName = 'Username is already taken';
    throw ApiError.BadRequest('Bad request', errors);
  }

  if (errors.userName || errors.realName || errors.password) {
    throw ApiError.BadRequest('Fulfil all fields', errors);
  }

  const id = uuidv4();
  const rolesList = ['user'];

  if (secretWord === process.env.SECRET_WORD) {
    rolesList.push('admin');
  }

  const roles = await Role.findAll({
    where: {
      roleName: rolesList,
    },
  });

  const newUser = {
    id,
    realName,
    userName,
    sex,
    password,
    roles,
  };

  const user = await User.create(newUser);
  await user.addRole(roles);

  return userNormalize(newUser);
}

async function login({ userName, password }) {
  const user = await User.findOne({
    where: { userName },
    include: { model: Role, attributes: ['roleName'] },
  });

  if (!user || user.password !== password) {
    throw ApiError.BadRequest('Wrong username or password');
  }

  return userNormalize(user);
}

export function userNormalize({ id, realName, userName, sex, createdAt, roles }) {
  const formattedRoles = roles.map(role => role.roleName);

  return {
    id,
    realName,
    userName,
    sex, createdAt,
    roles: formattedRoles,
  };
}

export const userService = {
  register,
  login,
};
