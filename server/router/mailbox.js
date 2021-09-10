import express from 'express';
import * as letterController from '../controller/letter.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router()

// GET /mailbox
router.get('/', isAuth, letterController.getRandomLetter);

// DELETE /mailbox/:id
router.delete('/:id', isAuth, letterController.flowALetter)

export default router;