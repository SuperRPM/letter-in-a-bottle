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

// get /auth/confirmEmail
const confirmEmail = false
router.get('confirmEmail', (req, res, next) => {
    console.log('confirmEmail access');
    res.status(200).json({ message: '이메일 인증이 완료 되었습니다.' })
})

// GET /auth/me
router.get('/me', authController.me);

export {router as authRouter, confirmEmail};