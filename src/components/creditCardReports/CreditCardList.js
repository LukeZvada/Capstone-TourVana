import React, { useContext, useEffect, useState } from 'react'
import { CreditCardReportContext } from './CreditCardProvider'
import { UserContext } from "../users/UsersProvider"
import "./creditCardReport.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const PurchaseList = (props) => {
    const { purchase, getPurchase, deletePurchase, getUserPurchases, userPurchases, searchExpenseTerms } = useContext(CreditCardReportContext)
    const { users, getUsers, getCurrentUser, currentUser } = useContext(UserContext)
    const [filteredExpenses, setFilteredExpenses] = useState([])
    const currentUserId = parseInt(localStorage.getItem("tourVana_username"))

    useEffect(() => {
        getPurchase()
        getCurrentUser()
        getUserPurchases(currentUserId)
    }, [])

    useEffect(() => {
        const matchingExpense = userPurchases.filter(expense => expense.storeName.toLowerCase().includes(searchExpenseTerms.toLowerCase()))
        setFilteredExpenses(matchingExpense)
    }, [searchExpenseTerms])

    useEffect(() => {
        setFilteredExpenses(userPurchases)
    }, [userPurchases])

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
            color: "black",
            fontSize: "18px",
          },
        },

      }));

    const classes = useStyles()

    return (
        <>

            <article className="creditCardHeader"> 
                <img className="creditCardImage" src={ require('../images/amex.png') } />
                <div><h2 className="expenses">Expenses</h2></div>
            </article>

            <article className="purchaseContainer">
                {
                    filteredExpenses.map(purchase => {
                            return <section key={purchase.id} className="purchases">
                                        <div className="purchaseDate">{purchase.date} </div>
                                        <div className="storeName"> <h1 className="storeTitle"> {purchase.storeName} </h1> <h2 className="storeSubTitle"> {purchase.city}, {purchase.state} </h2></div> 
                                        <div className="expenseIcons"> 
                                        <div className="price">-${purchase.price}</div> 
                                            <div className="buttonColumn">

                                                <button className="iconBackgroundStyling" variant="contained"
                                                    onClick={
                                                        () => deletePurchase(purchase.id).then(props.history.push("/creditCardReport"))
                                                    }>
                                                    <DeleteIcon style={{ fontSize: 16 }} className={classes.primary} /> 
                                                </button>
                                                <button className="iconBackgroundStyling" 
                                                    onClick={() => {
                                                        props.history.push(`/creditCardReport/edit/${purchase.id}`)
                                                    }}>
                                                    <EditIcon style={{ fontSize: 16 }} className={classes.primary} /> 
                                                </button>
                                                <button className="iconBackgroundStyling">
                                                    <AssignmentIcon style={{ fontSize: 16 }} className={classes.primary} onClick={() => props.history.push(`/creditCardReport/${purchase.id}`)} /> 
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                            
                    }).reverse()
                }
            </article>
            <section className={classes.root}>
                <Button className="addPurchaseButton" onClick={() => props.history.push("/creditCardReport/create")}>
                    <AddCircleOutlineIcon style={{ fontSize: 36 }} /> 
                </Button>
                <Button className="breakdown" color="primary" onClick={() => props.history.push(`/creditCardReport/chart`)}>
                    Breakdown
                </Button>
            </section>
        </>
    )
}