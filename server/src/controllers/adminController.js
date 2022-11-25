import { adminService } from '../services/adminService.js';

async function getUsers(req, res) {
  console.log(req.query);
  const { userId } = req.query;

  const users = await adminService.getAllUsers({ userId });

  res.send(users);
}

async function deleteUser(req, res) {
  const { userId } = req.params;
  const { adminId } = req.query;

  await adminService.deleteUser({
    userId,
    adminId,
  });

  res.sendStatus(204);
}

async function promoteUser(req, res) {
  const { userId } = req.params;
  const { adminId } = req.body;

  await adminService.promoteUser({
    userId,
    adminId,
  });

  res.sendStatus(200);
}

export const adminController = {
  getUsers,
  deleteUser,
  promoteUser,
};