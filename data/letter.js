import { Sequelize } from "sequelize/types";
import { Letter, User } from "../db/database.js"

const INCLUDE_USER = {
    attribues: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.account'), 'account'],
        [Sequelize.col('user.url'), 'url'],
    ]
};

const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export async function getAllLetterByAccount(account) {
    return Letter.findAll({
        ...INCLUDE_USER,
        ...ORDER_DESC,
        include: {
            ...INCLUDE_USER.include,
            where: {account},
        },
    });
};

export async function getLetterById(id) {
    return Letter.findByPk(id, INCLUDE_USER)
}

export async function createLetter(userId, text) {
    return Letter.create({ text, userId }).then(data => this.getLetterById(data.dataValues.id));
}

export async function deleteLetter(id) {
    return Letter.findByPk(id).then((letter) => letter.destroy());
}