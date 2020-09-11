import React, { useContext, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"
import { UserContext } from "../users/UsersProvider"
import "./Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const ShowList = (props) => {
    const { shows, getShows } = useContext(ShowContext)
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getShows()
        getUsers()
    }, [])

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
      }));

    const classes = useStyles()

    return (
        <>
            <article className="welcomeMessage">
                {
                    users.map(user => {
                        const currentUser = users.find(currentUser => currentUser.id === user.id) || {}
                            return <section key={user.id} className="user">
                            <div><h1 className="welcomeTitle">Welcome, {currentUser.firstName}</h1></div>
                            </section>
                    
                    })
                }
            </article>
            
            <article>
                <div><h2 className="upcomingShows">Upcoming Shows</h2></div>
            </article>

            <article className="showsContainer">
                {
                    shows.map(show => {
                            return <section key={show.id} className="shows">
                                        <div className="showDate">{show.timestamp} &curren; &nbsp; </div>
                                        <div className="showLocation"> {show.venueName} - {show.city}, {show.state} </div> 
                                        <div className="showIcons"> <DeleteIcon /> <EditIcon /> <AssignmentIcon /> </div>
                                    </section>
                            
                    })
                }
            </article>
            <section className={classes.root}>
                <Button className="addShowButton" onClick={() => props.history.push("/show/create")}>
                    <AddCircleOutlineIcon />
                </Button>
            </section>
        </>
    )

}
