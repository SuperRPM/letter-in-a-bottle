import * as userData from '../data/letter'
// getAllLetter getLetter createLetter removeLetter

export function getAllLetter(req, res) {
    const account = req.query.account;
    const data = await userData.getAllLettrByAccount(account);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: 'letter controller getAllLetter error'})
    }
}

export function getLetter(req, res) {
    const id = req.param.id;
    const letter = await userData.gettAllLetterbyId(id);
    if (letter) {
        res.status(200).json(letter);
    } else {
        res.status(404).json({ message: 'letter controller GetLetter error'});
    }
}