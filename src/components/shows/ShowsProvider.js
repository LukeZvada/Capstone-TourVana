import React, { useState } from "react"

export const ShowContext = React.createContext()

export const ShowProvider = (props) => {
    const [shows, setShows] = useState([])
    const [userShows, setUserShows] = useState([])
    const [dealMemo, setDealMemo] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getShows = () => {
        console.log("getting shows")
        return fetch("http://localhost:8088/show")
            .then(res => res.json())
            .then(setShows)
    }

    const getDealMemo = (dealMemo) => { 
        return fetch(`http://localhost:8088/show/${dealMemo}`)
        .then(res => res.json())
        .then(setDealMemo)
    }

    const getUserShows = (userId) => {
        return fetch(`http://localhost:8088/show?userId=${userId}`)
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
        console.log("delete method")
        return fetch(`http://localhost:8088/show/${showId}`, {
            method: "DELETE"
        })
            .then(() => {
                getUserShows(localStorage.getItem("tourVana_username"))
            })
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

    return (
        <ShowContext.Provider value={{
            shows, addShow, getShows, deleteShow, editShow, getUserShows, userShows,
            getDealMemo, dealMemo, searchTerms, setTerms
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}









