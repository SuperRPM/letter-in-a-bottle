import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js';
import { config } from '../config.js';

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ mesaage: "Authorization missing" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'middleware auth error' });
            }
            const user = await userData.(decoded.id);
            if(!user) {
                return res.status(401).json({ message: "그런 유저 없는데?" });
            }
            req.userId = user.id; //req.custonData 새로 등록
            next();
        }
    )
}