import { User } from "../db/database.js"

export async function findByAccount(account) {
    return User.findOne({ where: { account: account }});
}

export async function createUser(userObject) {
    return User.create(userObject).then(data => data.dataValues.id)
}