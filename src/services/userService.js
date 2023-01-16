import { storageService } from './storageService.js'

const KEY = 'bitcoinUser_db'

export const userService = {
    getUser
}

const user = {
    "name": "demo user",
    "balance": 100,
    "moves": "[]"
}

function getUser() {
    return new Promise((resolve, reject) => {
        const userData = storageService.load(KEY) || {}
        if (!userData.loggedInUser) {
            userData["loggedInUser"] = user
            storageService.store(KEY, userData)
        }
        resolve(userData.loggedInUser)
    })
}