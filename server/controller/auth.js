import * as userData from '../data/auth.js';
import jwt from 'jsonwebtoken';
import config from '../config.js'
import bcrypt from 'bcrypt';
function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

export async function signup(req, res) {
    const { account, password, name, email, url } = req.body;
    const exist = await userData.findByAccount(account);
    if (exist) {
        return res.status(409).json({ message: `${account}는 이미 사용되고 있는 아이디 입니다.`});
    };
    const hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userData.createUser({
        account,
        password : hash,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(200).json({ token, userId }); //userId return is not necessary
}

export async function login(req, res) {
    const { account, password } = req.body;
    const user = await userData.findByAccount(account);
    if (!user) {
        return res.status(401).json({ message: '아이디를 확인하삼!'})
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
        return res.status(401).json({ message: '비밀번호를 확인하삼!'})
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, account });
}

export async function me(req, res) {
    res.sendStatus(200);
}