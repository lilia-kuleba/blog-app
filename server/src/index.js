import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { postRouter } from './routers/postRouter.js';
import { userRouter } from './routers/userRouter.js';
import { adminRouter } from './routers/adminRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/admin', adminRouter);
app.use(errorMiddleware);

app.listen(PORT);
console.log(`Server is running on http://localhost:${process.env.PORT} port`);
