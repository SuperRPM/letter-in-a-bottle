import express from 'express';
import * as letterController from '../controller/letter.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router()

// GET /mailbox
router.get('/', isAuth, letterController.getRandomLetter);

// DELETE /mailbox/:id
router.get('/:id', isAuth, letterController.flowALetter)
// 이거 put이어야 할거같은데 왜 작동하지??
// 새로운 데이터를 입력받아서 수정하는게 아니라서 그냥 놔둬도 될거같다.
// 근데 문제는 이걸 외부에서 사용한다고 치면 get이 수정이라는걸 이해하기 어렵지 않을까?

export default router;