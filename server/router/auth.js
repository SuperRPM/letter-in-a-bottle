import express from 'express';
// import 'express-async-errors';
import * as authController from '../controller/auth.js'

const router = express.Router();

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

// get /auth/mail
router.post('/mail', authController.authEmail)
// mail api는 데이터를 조작하지 않는데 post 씀 query에 담기 싫어서

// delete /auth/leave
router.delete('/leave', authController.leave);

export default router