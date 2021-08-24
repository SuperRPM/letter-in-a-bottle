// findByAccount createUser

import { User } from "../db/database"

export async function findByAccount(account) {
    return User.findOne({ where: { account }})
}

export async function createUser(userObject) {
    return User.create(userObject).then(data => data.dataValues.id)
}