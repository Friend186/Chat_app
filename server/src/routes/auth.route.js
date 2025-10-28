import express from 'express';
import { signup ,signin, logout , updateprofile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

router.put("/update", protectRoute, updateprofile);

export default router; 