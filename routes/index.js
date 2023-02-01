import { Router } from "express";
import { router as userRouter } from './user.js'; 
import { router as wordsRouter } from './words.js';

export const router = new Router();

router.use('/user', userRouter);
router.use('/words', wordsRouter);