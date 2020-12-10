import React, { useContext, useEffect, useState } from "react"
import { ShowContext } from "./ShowsProvider"
import { UserContext } from "../users/UsersProvider"
import Calendar from 'react-calendar'; 
import "./Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const ShowList = (props) => {
    const { shows, getShows, userShows, getUserShows, deleteShow, searchTerms } = useContext(ShowContext)
    const { users, getUsers, getCurrentUser, currentUser } = useContext(UserContext)
    const [filteredShows, setFiltered] = useState([])
    const currentUserId = parseInt(localStorage.getItem("tourVana_username"))

    useEffect(() => {
        getShows()
        getUsers()
        getCurrentUser()
        getUserShows(currentUserId)
    }, [])
    
    useEffect(() => {
        const matchingShow = userShows.filter(show => show.venueName.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingShow)
    }, [searchTerms])

    useEffect(() => {
        setFiltered(userShows)
    }, [userShows])

 
    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "white",
                margin: 0
            },
            },
            primary: {
            '& > *': {
                color: "black"
            },
        },

    }));

    const classes = useStyles()

    return (
        <>
            <article className="welcomeMessage">
                <section key={currentUser.id} className="user">
                    <div><h1 className="welcomeTitle">Welcome, {currentUser.firstName}</h1></div>
                </section>
            </article>
            
            <article>
                <div><h2 className="upcomingShows">Upcoming Shows</h2></div>
            </article>

            <article className="showsContainer">
                {
                    filteredShows.map(show => {
                            return <section key={show.id} className="shows">
                                        <div className="showDate">{show.date} </div>
                                        <div className="showLocation"> <h1 className="venueTitle"> {show.venueName} </h1> <h2 className="venueSubTitle">{show.city}, {show.state}</h2> </div> 
                                        <div className="showIcons"> 
                                            <button className="deleteShowButton" variant="contained"
                                                onClick={
                                                    () => deleteShow(show.id)
                                                }>
                                                <DeleteIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                            </button>
                                            <button className="deleteShowButton" 
                                                onClick={() => {
                                                        props.history.push(`/show/edit/${show.id}`)
                                                }}>
                                                <EditIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                            </button>
                                            <button className="deleteShowButton">
                                                <AssignmentIcon style={{ fontSize: 20 }} className={classes.primary} onClick={() => props.history.push(`/show/${show.id}`)} /> 
                                            </button>
                                        </div>
                                    </section>
                            
                    })
                }
            </article>
            <section className={classes.root}>
                <Button className="addShowButton" onClick={() => props.history.push("/show/create")}>
                    <AddCircleOutlineIcon style={{ fontSize: 36 }} />
                </Button>
            </section>
        </>
    )
}

