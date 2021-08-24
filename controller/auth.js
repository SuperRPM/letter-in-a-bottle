import * as userData from '../data/auth.js';
// signup login me


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
    const token = 1234;
    res.status(200).json({ account });
}

export async function me(req, res) {
    res.sendStatus(200);

}