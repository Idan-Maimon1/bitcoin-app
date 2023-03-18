import { storageService } from './storageService.js'

const KEY = 'user_db'

export const userService = {
    getUser,
    setUser,
    addMove,
    addCoins
}
const DemoUser = {
    loggedInUser: {
        name: "Demo User",
        balance: 120,
        moves: [
            { toId: "nlCubKbebY", to: "bat man", at: 1674415586086, amount: 100 },
            { toId: "nlCubKbebY", to: "bat man", at: 1674329000000, amount: 150 },
            { toId: "5a56640269f443a5d64b32ca", to: "Ochoa Hyde", at: 1674415587928, amount: 20 },
            { toId: "5a5664025f6ae9aa24a99fde", to: "Hallie Mclean", at: 1674242000000, amount: 60 },
            { toId: "5a56640252d6acddd183d319", to: "Parsons Norris", at: 1674590000000, amount: 100 },
            { toId: "5a56640252d6acddd183d319", to: "Parsons Norris", at: 1674605606493, amount: 25 },
            { toId: "5a566402abb3146207bc4ec5", to: "Floyd Rutledge", at: 1674419706808, amount: 100 },
            { toId: "90896b13a81d08ee64028c0a", to: "Perlin Perlino", at: 1674419856915, amount: 30 },
            { toId: "495af35664cf002ed1b47b4d", to: "Joey Geller", at: 1674680612774, amount: 32 }]
    }
}

function getUser() {
    return new Promise((resolve, reject) => {
        const userData = storageService.load(KEY) || null
        resolve(userData === null ? userData : userData.loggedInUser)
    })
}

function setUser(name) {
    return new Promise((resolve, reject) => {
        const userData = name === 'DemoUser' ? DemoUser : {
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

function addMove(contact, amount) {
    return new Promise((resolve, reject) => {
        const move = {
            toId: contact._id,
            to: contact.name,
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

function addCoins( amount) {
    return new Promise((resolve, reject) => {
        const userData = storageService.load(KEY)
        userData.loggedInUser.balance += amount
        storageService.store(KEY, userData)
        resolve(userData.loggedInUser)
    })
}