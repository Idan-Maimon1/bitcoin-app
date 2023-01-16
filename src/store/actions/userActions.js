import { userService } from "../../services/userService"


export function spendBalance(amount) {
    return async (dispatch) => {
        dispatch({ type: 'SPEND_BALANCE', amount })
    }
}

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