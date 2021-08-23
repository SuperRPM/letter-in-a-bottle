// signup login me

export async function sigup(req, res) {
    const { account, password, name, email, url } = req.body;
    const user = {
        account,
        password,
        name,
        email,
        url,
    };
    const token = 1234;
    res.status(200).json({ token, user });
}

export async function login(req, res) {
    const { account, password } = req.body;
    const token = 1234;
    res.status(200).json({ token, account });
}

export async function me(req, res) {
    res.sendStatus(200);

}