import React, { useContext, useEffect, useState } from "react"
import { ShowContext } from "../shows/ShowsProvider"
import { UserContext } from "../users/UsersProvider"
import { SettlementImageContext } from "./SettlementsProvider"
import "../shows/Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const SettlementList = (props) => { 
    const { userShows, getUserShows } = useContext(ShowContext)
    const { getCurrentUser } = useContext(UserContext)
    const { settlements, getSettlements } = useContext(SettlementImageContext)
    const currentUserId = parseInt(localStorage.getItem("tourVana_username"))

    useEffect(() => {
        getCurrentUser()
        getUserShows(currentUserId)
        getSettlements()
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
        primary: {
          '& > *': {
            color: "black"
          },
        },

      }));

    const classes = useStyles()

    return (
        <>
            
            <article>
                <div><h2 className="upcomingSettlements">Settlements</h2></div>
            </article>

            <article className="showsContainer">
                {
                    userShows.map(show => {
                        const currentSettlement = settlements.find(settlement => settlement.showId === show.id) || {}
                        return <section key={show.id} className="shows">
                                    <div className="showDate">{show.date} </div>
                                    <div className="showLocation"> <h1 className="venueTitle"> {show.venueName} </h1> <h2 className="venueSubTitle">{show.city}, {show.state}</h2> </div> 
                                    <div className="showIcons"> 
                                        <button className="deleteShowButton" onClick={() => props.history.push(`/settlement/create/${show.id}`)}>
                                            <AddCircleOutlineIcon style={{ fontSize: 20 }} />
                                        </button>
                                        <button className="deleteShowButton">
                                                <AssignmentIcon style={{ fontSize: 20 }} className={classes.primary} onClick={() => props.history.push(`/settlement/${currentSettlement.id}`)}/> 
                                        </button>
                                        
                                    </div>
                                </section>
                            
                    })
                }
            </article>
        </>
    )
}
