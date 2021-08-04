import React, { useState } from 'react'
import './UsersList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../actions/user-actions'
import Loading from './Loading'
import Modal from '../components/Modal'

const UsersList = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(state => state.users)
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({})
    const [userId, setUserId] = useState()
    const { loading, error, users } = usersData

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const editUserHandler = (user) => {
        setShow(true)
        setUser(user)
        setUserId(user.id)
    }

    const closeModalHandler = () => {
        setShow(false)
    }

    return (
        <>
            {loading && <Loading />}
            {error && <h2 style={{ textAlign: 'center' }}>{error}</h2>}
            <Modal userId={userId} user={user} show={show} setShow={setShow} onCancel={closeModalHandler} />
            {
                !loading && <table>
                    <thead>
                        <tr>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && users && users.map(user => {
                            const date = new Date(user.createdAt).toString()
                            const formatedDate = new Date(date).toLocaleString()
                            return (
                                <tr key={user.id}>
                                    <td data-label="Image"><img src={user.avatar} alt={user.name} /></td>
                                    <td data-label="Name">{user.name}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="CreatedAt">{formatedDate.split(',')[0]}</td>
                                    <td data-label="Actions">
                                        <button className="edit-btn" onClick={() => editUserHandler(user)}>EDIT</button> <br />
                                        <button className="delete-btn" onClick={() => deleteHandler(user.id)}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
            {!loading && users.length === 0 && !error && <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>There are no users!</h3>}
        </>
    )
}

export default UsersList
