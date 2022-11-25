import { axiosClient } from './http/axiosClient';

function getAllUsers(userId) {
  const params = {
    userId,
  };

  return axiosClient.get('/admin/users', {
    params,
  });
}

function deleteUser({ userId, adminId }) {
  const params = {
    adminId,
  };

  return axiosClient.delete(`/admin/delete-user/${userId}`, {
    params,
  });
}

function promoteUser({ userId, adminId }) {
  return axiosClient.put(`admin/promote-user/${userId}`, {
    adminId,
  });
}

export const adminService = {
  getAllUsers,
  deleteUser,
  promoteUser,
};
