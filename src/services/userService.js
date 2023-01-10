export const userService = {
    getUser
}

const user = {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
}

function getUser() {
    return new Promise((resolve, reject) => {
        var userToReturn = user;
        resolve(userToReturn)
    })
}