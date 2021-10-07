import express from 'express';
// import 'express-async-errors';
import * as letterController from '../controller/letter.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /letter
router.get('/', isAuth, letterController.getAllLetter);

// GET /letter/:id
router.get('/:id', isAuth, letterController.getReply);

// POST /letter
router.post('/', isAuth, letterController.postLetter);

// POST /letter/:id
router.post('/:id', isAuth, letterController.postReply);

// DELETE /letter/:id
router.delete('/:id', isAuth, letterController.removeLetter);

export default router;