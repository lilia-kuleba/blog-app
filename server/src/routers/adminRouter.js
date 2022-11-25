import express from 'express';
import { catchError } from '../middlewares/catchError.js';
import { adminController } from '../controllers/adminController.js';

export const adminRouter = new express.Router();

adminRouter.get('/users', catchError(adminController.getUsers));
adminRouter.delete('/delete-user/:userId', catchError(adminController.deleteUser));
adminRouter.put('/promote-user/:userId', catchError(adminController.promoteUser));
