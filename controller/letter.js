import * as userData from '../data/letter'
// getAllLetter getLetter createLetter removeLetter

export function getAllLetter(req, res) {
    const account = req.query.account;
    const data = userData.getAllLettrByAccount(account);
    if (data) {
        res.status(200).json(data);
    }
}