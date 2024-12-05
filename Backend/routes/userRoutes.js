import express from 'express';
import { followAndUnfollowUser, loginUser, logout, Myprofile, registerUser, userProfile } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuth,logout);
router.get("/me",isAuth,Myprofile);
router.get("/:id",isAuth,userProfile);
router.post("/follow/:id",isAuth,followAndUnfollowUser);

export default router;