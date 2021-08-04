import axios from 'axios'
import {
    USERS_LIST_FAIL,
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/user-constants'

export const usersList = (keyword = "") => async (dispatch) => {
    try {
        dispatch({
            type: USERS_LIST_REQUEST
        })
        let data
        if (keyword === "") {
            data = await axios.get('https://610ac7ae52d56400176aff98.mockapi.io/users')
        } else {
            data = await axios.get(`https://610ac7ae52d56400176aff98.mockapi.io/users?search=${keyword}`)
        }
        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data.data
        })
    } catch (e) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: e.response.data
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })
        await axios.delete(`https://610ac7ae52d56400176aff98.mockapi.io/users/${id}`)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: id
        })
    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: e.response.data
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const config = { headers: { 'Content-Type': 'application/json' } };
        await axios.put(`https://610ac7ae52d56400176aff98.mockapi.io/users/${id}`,
            userData,
            config
        )
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: { userData, id }
        })
    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response.data
        })
    }
}
