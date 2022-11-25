import express from 'express';
import { postController } from '../controllers/postController.js';
import { catchError } from '../middlewares/catchError.js';

export const postRouter = new express.Router();

postRouter.get('/', catchError(postController.getAllBlog));
postRouter.post('/create', catchError(postController.createPost));
postRouter.put('/edit/:postId', catchError(postController.editPost));
postRouter.delete('/delete/:postId', catchError(postController.deletePost));