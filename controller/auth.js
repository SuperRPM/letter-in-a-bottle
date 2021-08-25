import * as userData from '../data/auth.js';
import jwt from 'jsonwebtoken';
import config from '../config.js'

function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

export async function signup(req, res) {
    const { account, password, name, email, url } = req.body;
    const exist = await userData.findByAccount(account);
    if (exist) {
        return res.status(409).json({ message: `${account}는 이미 사용되고 있는 아이디 입니다.`});
    }
    const userObject = {
        account,
        password,
        name,
        email,
        url,
    };
    const userId = await userData.createUser(userObject)
    const token = 1234;
    res.status(200).json({ token, userId });
}

export async function login(req, res) {
    const { account, password } = req.body;
    const exist = await userData.findByAccount(account);
    if (!exist) {
        return res.status(401).json({ message: '아이디를 확인하삼!'})
    }
    const token = 1234;
    res.status(200).json({ message: '로그인 성공했삼!' });
}

export async function me(req, res) {
    res.sendStatus(200);
}