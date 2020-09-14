import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ShowContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ShowProvider = (props) => {
    const [shows, setShows] = useState([])
    const [userShows, setUserShows] = useState([])

    const getShows = () => {
        return fetch("http://localhost:8088/show")
            .then(res => res.json())
            .then(setShows)
    }

    // create a getCurrentUserShows function
    // in that function, call getShows()
    // then map through all those shows and only return the shows that have a userId that matches the currentUser.id
    const getUserShows = user => {
        console.log("user shows current user", user)
        return fetch(`http://localhost:8088/show?userId=${user.id}`)
            .then(res => res.json())
            .then(setUserShows)
    }

    const addShow = show => {
        return fetch("http://localhost:8088/show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(show)
        })
            .then(getShows)
    }

    const deleteShow = (showId) => {
        return fetch(`http://localhost:8088/show/${showId}`, {
            method: "DELETE"
        })
            .then(getShows)
    }

    const editShow = show => {
        return fetch(`http://localhost:8088/show/${show.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(show)
        })
            .then(getShows)
    }
    /*
        You return a context provider which has the
        `shows` state, the `addShow` function,
        and the `getShow` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ShowContext.Provider value={{
            shows, addShow, getShows, deleteShow, editShow, getUserShows, userShows
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}









