import React, { useContext, useEffect } from 'react'
import { CreditCardReportContext } from './CreditCardProvider'
import "./creditCardReport.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const PurchaseList = (props) => {
    const { purchase, getPurchase, deletePurchase } = useContext(CreditCardReportContext)

    useEffect(() => {
        getPurchase()
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
            color: "red",
            fontSize: "18px",
          },
        },

      }));

    const classes = useStyles()

    return (
        <>

            <article> 
            <img className="creditCardImage" src={ require('../images/amex.png') } />
            </article>
            <article>
                <div><h2 className="expenses">Expenses</h2></div>
            </article>

            <article className="purchaseContainer">
                {
                    purchase.map(purchase => {
                            return <section key={purchase.id} className="purchases">
                                        <div className="purchaseDate">{purchase.date} &curren; &nbsp; </div>
                                        <div className="storeName"> <h1 className="storeTitle"> {purchase.storeName} </h1> <h2 className="storeSubTitle"> {purchase.city}, {purchase.state} </h2></div> 
                                        <div className="expenseIcons"> 
                                        <div className="price">${purchase.price}</div> 
                                            <div className="buttonColumn">

                                                <button className="deletePurchaseButton" variant="contained"
                                                    onClick={
                                                        () => deletePurchase(purchase.id).then(props.history.push("/creditCardReport"))
                                                    }>
                                                    <DeleteIcon className={classes.primary} /> 
                                                </button>
                                                <button className="editPurchaseButton" 
                                                    onClick={() => {
                                                        props.history.push(`/creditCardReport/edit/${purchase.id}`)
                                                    }}>
                                                    <EditIcon className={classes.primary} /> 
                                                </button>
                                                <button className="viewPurchaseButton">
                                                    <AssignmentIcon className={classes.primary} /> 
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                            
                    })
                }
            </article>
            <section className={classes.root}>
                <Button className="addPurchaseButton" onClick={() => props.history.push("/creditCardReport/create")}>
                    <AddCircleOutlineIcon />
                </Button>
            </section>
        </>
    )
}