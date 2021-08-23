import express from 'express';
import 'express-async-errors';

const router = express.Router();

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

// GET /auth/me
router.get('/me', authController.me);

export default router;