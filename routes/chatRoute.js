import express from 'express';
import {protect} from '../middleware/auth.js';
import { fetchChats} from '../controllers/chatController.js'

const router = express.Router();

router.route("/").post(protect, fetchChats);

export default router;