import { axiosClient } from './http/axiosClient';

function getAll() {
  return axiosClient.get('/users')
}

function registerUser(newUser) {
  return axiosClient.post('/users/register', newUser);
}

function login({ userName, password }) {
  const params = {
    userName,
    password,
  }
  return axiosClient.get('/users/login', { params });
}


export const userService = {
  getAll,
  registerUser,
  login,
};
