import React, { useContext, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"
import { UserContext } from "../users/UsersProvider"
import "./Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

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
            color: "#EB5757"
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
            <article className="showsContainer">
                {
                    shows.map(show => {
                            return <section key={show.id} className="shows">
                                        <div>{show.timestamp} {show.venueName} {show.city} {show.state}</div>
                                    </section>
                    })
                }
            </article>
            <section className={classes.root}>
                <Button onClick={() => props.history.push("/show/create")}>
                    <AddCircleOutlineIcon />
                </Button>
            </section>
        </>
    )

}
// employees.map(employee => {
//     const employeeLocation = locations.find(location => location.id === employee.locationId) || {}
//     return <section key={employee.id} className="employee">
//         <div><h3>{employee.name}</h3></div>
//         <div>Address: {employeeLocation.name}</div>
//     </section>
// })