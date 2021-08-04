import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../actions/user-actions'

import Backdrop from './Backdrop'
import './Modal.css'

const Modal = ({ onCancel, show, setShow, user, userId }) => {
    const [updatedUser, setUpdatedUser] = useState({
        avatar: '',
        name: '',
        email: '',
        createdAt: ''
    })
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`https://610ac7ae52d56400176aff98.mockapi.io/users/${userId}`)
            setUpdatedUser(data)
        }
        fetchData()
    }, [userId])

    const changeHandler = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(user.id, updatedUser))
        setShow(false)
    }

    const modalElement = (
        <div className="Modal">
            {show && <Backdrop onClick={onCancel} />}
            {
                show && <form onSubmit={submitHandler}>
                    <input value={updatedUser.avatar} onChange={changeHandler} name="avatar" type="text" placeholder="Avatar" /><br />
                    <input value={updatedUser.name} onChange={changeHandler} name="name" type="text" placeholder="Name" /><br />
                    <input value={updatedUser.email} onChange={changeHandler} name="email" type="text" placeholder="Email" /><br />
                    <input value={updatedUser.createdAt} onChange={changeHandler} name="createdAt" type="text" placeholder="Created At" /><br />
                    <div className="modal-form-buttons">
                        <button type="submit">SUBMIT</button>
                        <button onClick={() => setShow(false)}>CLOSE</button>
                    </div>
                </form>
            }
        </div>
    )
    return ReactDOM.createPortal(modalElement, document.getElementById("modal-hook"))
}

export default Modal