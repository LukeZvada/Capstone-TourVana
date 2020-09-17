import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        const currentUserId = localStorage.getItem("tourVana_username")
        const id = parseInt(currentUserId)
        return fetch(`http://localhost:8088/users/${id}`)
        .then(res => res.json())
        .then(setCurrentUser)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getCurrentUser, currentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}