import { storageService } from './storageService.js'
import { utilService } from './utilService'

const KEY = 'user_db'

export const userService = {
    getUser,
    setUser,
    addMove
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
                balance: 1000,
                moves: []
            }
        }
        storageService.store(KEY, userData)
        resolve(userData.loggedInUser)
    })
}

function addMove(contactName, amount) {
    return new Promise((resolve, reject) => {
        const move = {
            toId: utilService.makeId(),
            to: contactName,
            at: Date.now(),
            amount,
        }
        const userData = storageService.load(KEY)
        userData.loggedInUser.moves.push(move)
        userData.loggedInUser.balance -= amount
        storageService.store(KEY, userData)
        resolve(userData.loggedInUser)
    })
}