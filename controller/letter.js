import * as letterData from '../data/letter.js'
// getAllLetter getLetter createLetter removeLetter

export async function getAllLetter(req, res) {
    const account = req.query.account;
    const data = await letterData.getAllLetterByAccount(account);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: 'letter controller getAllLetter error'})
    }
}

export async function getLetter(req, res) {
    const id = req.params.id;
    const letter = await letterData.getLetterById(id);
    if (letter) {
        res.status(200).json(letter);
    } else {
        res.status(404).json({ message: 'letter controller GetLetter error'});
    }
}

export async function postLetter(req, res) {
    const {text} = req.body;
    const letter = await letterData.createLetter(text, req.userId);
    res.status(201).json(letter);
}

// 받은편지를 답장하지 않고 다시 데이터베이스로 넣을 때 쓴다.
export async function flowALetter(req, res) {
    return null
}

export async function removeLetter(req, res) {
    const id = req.param.id;
    const isValid = await letterData.getLetterById(id);
    if (!isValid) {
        return res.sendStatus(404);
    }
    if (isValid.userId !== req.userId) {
        return res.sendStatus(403);
    }
    await letterData.deleteLetter(id);
    res.sendStatus(204);
}