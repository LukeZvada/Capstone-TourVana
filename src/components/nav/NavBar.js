import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import TimelineIcon from '@material-ui/icons/Timeline';
import HomeIcon from '@material-ui/icons/Home';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


export const NavBar = (props) => {
    return ( 
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/show"><div className ="icon"><HomeIcon style={{ fontSize: 28 }} /></div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/settlement"><div className ="icon"><TimelineIcon style={{ fontSize: 28 }} /></div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/creditCardReport"><div className ="icon"><CreditCardIcon style={{ fontSize: 28 }} /></div></Link>
            </li>
            <li className="navbar__item"> 
                <Link className="navbar__link" to="/logout"><div className ="icon"><AccountBoxIcon style={{ fontSize: 28 }} /></div> </Link>
            </li>
        </ul>
    )
}