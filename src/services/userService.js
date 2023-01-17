import { storageService } from './storageService.js'

const KEY = 'user_db'

export const userService = {
    getUser,
    setUser
}

const move = {
    toId: "d99e3u2ih329",
    to: "Moshiko",
    at: 2652712571,
    amount: 2
}

function getUser() {
    return new Promise((resolve, reject) => {
        const userData = storageService.load(KEY) || null
        resolve(userData === null ? userData : userData.loggedInUser)
    })
}

function setUser(name) {
    return new Promise((resolve, reject) => {
        const userData = {
            loggedInUser: {
                name,
                balance: 100,
                moves: []
            }
        }
        storageService.store(KEY, userData)
        resolve(userData.loggedInUser)
    })
}