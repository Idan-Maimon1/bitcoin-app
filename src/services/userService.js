import { storageService } from './storageService.js'

const KEY = 'bitcoinUser_db'

export const userService = {
    getUser,
    setUser
}

function getUser() {
    return new Promise((resolve, reject) => {
        const userData = storageService.load(KEY) || null
        resolve(userData === null ? userData : userData.loggedInUser)
    })
}
function setUser(userName) {
    return new Promise((resolve, reject) => {
        const userData = {
            loggedInUser: {
                name: userName,
                balance: 100,
                moves: []
            }
        }
        storageService.store(KEY, userData)
        resolve(userData.loggedInUser)
    })
}