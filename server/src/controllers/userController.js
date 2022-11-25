import { userService } from '../services/userService.js';

async function register(req, res) {
  const { realName, userName, sex, secretWord, password } = req.body;

  const newUser = await userService.register({
    realName,
    userName,
    sex,
    secretWord,
    password
  });

  res.send(newUser);
}

async function login(req, res) {
  const { userName, password } = req.query;

  const foundedUser = await userService.login({ userName, password });

  res.send(foundedUser);
}

export const userController = {
  register,
  login,
};
