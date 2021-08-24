import express from 'express';
// import 'express-async-errors';
import * as letterController from '../controller/letter.js'

const router = express.Router();

// GET /letter
router.get('/', letterController.getAllLetter);

// GET /letter/:id
router.get('/:id', letterController.getLetter);

// POST /letter
router.post('/', letterController.postLetter);

// DELETE /letter/:id
router.delete('/:id', letterController.removeLetter);

export default router;