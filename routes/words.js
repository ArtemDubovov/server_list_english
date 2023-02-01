import { Router } from "express";
import wordController from "../controllers/wordController.js";

export const router = new Router();

router.get('/all', wordController.getAllWords);
router.delete('/', wordController.deleteWord);
router.post('/', wordController.addWord);
router.patch('/', wordController.updateWord);
