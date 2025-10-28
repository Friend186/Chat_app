import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsers , getMessages ,sentMessage} from '../controllers/message.controller.js';
const router = express.Router();

router.get("/users",protectRoute,getUsers);

router.get('/:id' , protectRoute , getMessages);

router.post('/sent/:id', protectRoute, sentMessage);

export default router; 