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
    res.status(200).json(user);
}

export async function login(req, res) {
    res.sendStatus(200);
}

export async function me(req, res) {
    res.sendStatus(200);
}