import { Router } from "express";
import userController from "../controllers/userController.js";

export const router = new Router();

router.get('/', userController.getAllUsers);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.checkAuth);