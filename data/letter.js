import { Letter, User } from "../db/database.js"
import pkg from 'sequelize';
const { Sequelize } = pkg;

const JOIN_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
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