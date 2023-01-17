import { userService } from "../../services/userService"

export function loadUser() {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getUser()
            dispatch({ type: 'SET_USER', user })
            return user
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setUser({ firstName, lastName }) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.setUser(firstName + ' ' + lastName)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function transferCoins(contact, amount) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.addMove(contact, amount)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }
}