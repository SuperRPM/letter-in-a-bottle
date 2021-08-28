import { Letter, User } from "../db/database.js";
import { findByAccount } from '../data/auth.js';
import pkg from 'sequelize';
const { Sequelize } = pkg;

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

export async function createLetter(text, userId) {
    return Letter.create({ text, userId }).then(data => this.getLetterById(data.dataValues.id));
}

export async function deleteLetter(id) {
    return Letter.findByPk(id).then((letter) => letter.destroy());
}

export async function getUnrepliedLetter(userId) {
    const unrepliedLetter = await Letter.findAll({
        ...JOIN_USER,
        where: { receiver: 0 },
        // 자기편지를 받으면 안되고 이미 편지를 가진 유저가 또 받으면 안되는데 어떻게 해야하나
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
        user.mail = true;
        user.save();
    })
    return Letter.findByPk(letterId, JOIN_USER)
    .then((letter) => {
        letter.receiver = userId;
        return letter.save();
    })
}