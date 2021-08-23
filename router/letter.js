import express from 'express';
import 'express-async-errors';

const router = express.Router();

// GET /letter
router.get('/', letterController.getAllLetters);

// GET /letter/:id
router.get('/:id', letterController.getLetter);

// POST /letter
router.post('/', letterController.createLetter);

// DELETE /letter/:id
router.delete('/:id', letterController.removeLetter);

export default router;