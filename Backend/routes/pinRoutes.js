import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { createPin } from '../controllers/pinController.js';
const router = express.Router();
router.post("/new",isAuth,uploadFile,createPin);
export default router;