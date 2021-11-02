import { User } from "../db/database.js"

export async function findByAccount(account) {
    return User.findOne({ where: { account: account }});
}

export async function createUser(userObject) {
    return User.create(userObject).then(data => data.dataValues.id)
}

export async function findById(id) {
    return User.findOne({ where: {id} })
}

export async function eliminateUser(account) {
    return User.destroy({ where: {account: account}}).then((result) => {console.log(result);}).catch((err) => {console.log(err);})
    
}