import express from 'express';
import { userController } from '../controllers/userController.js';
import { catchError } from '../middlewares/catchError.js';

export const userRouter = new express.Router();

userRouter.get('/login', catchError(userController.login));
userRouter.post('/register', catchError(userController.register));
