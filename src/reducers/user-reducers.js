import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/user-constants'

export const usersReducer = (state = { users: [], loading: false }, action) => {
    switch (action.type) {
        //List all users
        case USERS_LIST_REQUEST:
            return {
                loading: true,
            }
        case USERS_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case USERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        //Delete user
        case USER_DELETE_REQUEST: {
            return {
                ...state,
                loading: false,
                users: [...state.users]
            }
        }
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users.filter(user => user.id !== action.payload)]
            }
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        //Update user
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: false,
            }
        case USER_UPDATE_SUCCESS:
            const { userData, id } = action.payload
            const updatedUser = [...state.users]
            const indexUser = updatedUser.findIndex(user => {
                return user.id === id
            })
            updatedUser[indexUser] = userData
            return {
                ...state,
                loading: false,
                users: updatedUser
            }
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

