import * as userData from '../data/auth.js';
// signup login me


export async function signup(req, res) {
    const { account, password, name, email, url } = req.body;
    const exist = await userData.findByAccount(account);
    if (exist) {
        return res.sendStatus(409);
    }
    const user = {
        account,
        password,
        name,
        email,
        url,
    };
    const userId = await userData.createUser(user)
    const token = 1234;
    res.status(200).json({ token, userId });
}

export async function login(req, res) {
    const { account, password } = req.body;
    const token = 1234;
    res.status(200).json({ token, account });
}

export async function me(req, res) {
    res.sendStatus(200);

}