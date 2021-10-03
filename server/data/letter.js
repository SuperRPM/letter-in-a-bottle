import { Letter, Reply, User } from "../db/database.js";
import pkg from 'sequelize';
const { Sequelize } = pkg;
const Op = Sequelize.Op;

const JOIN_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        'receiver',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.account'), 'account'],
        [Sequelize.col('user.url'), 'url'],
    ],
    include: {
        model: User,
        attributes: []
    }
};

const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export async function getAllLetterByAccount(account) {
    return Letter.findAll({
        ...JOIN_USER,
        ...ORDER_DESC,
        include: {
            ...JOIN_USER.include,
            where: {account: account},
        },
    });
};

export async function getLetterById(id) {
    return Letter.findByPk(id, JOIN_USER)
}

export async function getReplyById(id) {
    return Reply.findByPk(id)
}

export async function createLetter(text, userId) {
    return Letter.create({ text, userId }).then(data => this.getLetterById(data.dataValues.id));
}

export async function createReply(text, userId, letterId) {
    return Reply
        .create({ text, userId })
        .then(data => {
            Letter.findByPk(letterId).then((letter) => { 
                // console.log(data.dataValues.id);
                const replyId = data.dataValues.id;
                letter.replied = replyId;
                letter.save();
                return this.getReplyById(replyId);
            });
        });
}

export async function deleteLetter(id) {
    return Letter.findByPk(id).then((letter) => letter.destroy());
}

export async function getUnrepliedLetter(userId) {
    const unrepliedLetter = await Letter.findAll({
        ...JOIN_USER,
        where: { 
            receiver: 0,
            replied: 0, 
            [Op.not] : {userId: userId} // can not get letter more than one.
        },
        include: {
            ...JOIN_USER.include,
        },
    });

    const length = unrepliedLetter.length;
    if (length === 0) {
        return false;
    }

    const random = Math.round(Math.random() * 10);
    const index = random % length;
    const letterId = unrepliedLetter[index].dataValues.id;
    User.findByPk(userId)
    .then((user) => {
        user.mail = letterId;
        user.save();
    })
    return Letter.findByPk(letterId, JOIN_USER)
    .then((letter) => {
        letter.receiver = userId;
        return letter.save();
    })
}

export async function checkMailbox(userId) {
    return await User.findByPk(userId).then((user) => {
        return user.mail;
    });
}
