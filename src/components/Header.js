import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usersList } from '../actions/user-actions'
import './Header.css'


const Header = () => {
    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (keyword === "") {
            dispatch(usersList(""))
        }
    }, [keyword, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(usersList(keyword))
    }

    return (
        <div className="Header">
            <h1>Users CRUD</h1>
            <form>
                <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Search for users" />
                <button type="submit" onClick={submitHandler}>Search</button>
            </form>
        </div>
    )
}

export default Header
