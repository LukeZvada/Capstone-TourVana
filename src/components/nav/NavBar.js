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
                <Link className="navbar__link" to="/"><HomeIcon /></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"><TimelineIcon /></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"><CreditCardIcon /></Link>
            </li>
            <li className="navbar__item"> 
                <Link className="navbar__link" to="/"><AccountBoxIcon /></Link>
            </li>
        </ul>
    )
}