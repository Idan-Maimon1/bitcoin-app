const INITIAL_STATE = {
    loggedInUser: {}
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }

        case 'SPEND_BALANCE':
            const { loggedInUser } = state

            return {
                ...state,
                loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount }
            }

        default:
            return state
    }
}