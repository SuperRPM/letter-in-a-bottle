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

// createdAt으로 만들어진지 며칠만에 도착한 편지인지도 알려주자. 근데 그건 어디서 하지???
export async function getRandomLetter(req, res) {
    const alreadyGetMailId = await letterData.checkMailbox(req.userId);
    if (alreadyGetMailId) { 
        const existMail = await letterData.getLetterById(alreadyGetMailId)
        return res.status(200).json(existMail)
    }
    const UnrepliedLetter = await letterData.getUnrepliedLetter(req.userId);
    if (!UnrepliedLetter) {
        return res.status(404).json({ message: '아직 편지가 없어요! 다음에 다시 시도해 주세염' });
    }
    res.status(200).json(UnrepliedLetter);
}

export async function postLetter(req, res) {
    const {text} = req.body;
    const letter = await letterData.createLetter(text, req.userId);
    res.status(201).json(letter);
}

export async function postReply(req, res) {
    const { text } = req.body;
    const letterId = req.params.id;
    const reply = await letterData.createReply(text, req.userId, letterId);
    res.status(201).json(reply);
}

// 받은편지를 답장하지 않고 다시 데이터베이스로 넣을 때 쓴다.
export async function flowALetter(req, res) {
    return null
}

export async function removeLetter(req, res) {
    const id = req.params.id;
    const isValid = await letterData.getLetterById(id);
    if (req.userId !== isValid.userId) {
        return res.status(403).json({ message: '삭제할 권한이 없는데? 남의 편지를 삭제하려는거야? ㅜㅜ' })
    }
    if (!isValid) {
        return res.sendStatus(404);
    }
    await letterData.deleteLetter(id);
    res.sendStatus(204);
}