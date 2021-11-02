import * as userData from '../data/auth.js';
import jwt from 'jsonwebtoken';
import config from '../config.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value
}

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

// 아이디가 틀렸는지 비밀번호가 틀렸는지 원래 아려주면 안됨. 해킹당함.
// 근데 둘중 뭐가 틀렸는지 구분이 안되니까 내가 어디에러인지 찾기 어려움
// 콘솔에 출력해주면 될듯?
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

export async function authEmail(req, res) {
    const {email} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: required('EMAIL'),
            pass: required('PASSWORD'),
        }
    })
    const option = {
        from: 'vidafirmar@gmail.com',
        to: email,
        subject: 'Letter In Bottle 이메일 인증',
        html: '<h3>클릭해서 회원가입을 계속하세요.</h3><a href="http://localhost:8080/signup">' + '회원가입</a>',
    };
    transporter.sendMail(option, function(err, res){
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log('sendMail success!')
        }
        transporter.close();
    })
    res.status(200).json({ message: `email sending success`})
}

export async function leave(req, res) {
    const { account } = req.body
    console.log('account: ' + account);
    const result = await userData.eliminateUser(account);
    console.log(result);
    res.status(200).json({ message: `good bye`})
}