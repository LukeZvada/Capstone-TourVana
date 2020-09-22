import React, { useContext, useEffect, useState, useRef } from "react"
import { CreditCardReportContext } from "./CreditCardProvider"
import "./creditCardReport.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const PurchaseForm = (props) => {
    const { addPurchase, getPurchase, purchase, editPurchase } = useContext(CreditCardReportContext)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [purchases, setPurchase] = useState({})

    const editMode = props.match.params.hasOwnProperty("purchaseId")

    const handleControlledInputChange = (event) => {

        const newPurchase = Object.assign({}, purchases)
        newPurchase[event.target.name] = event.target.value
        setPurchase(newPurchase)
    }

    const getPurchaseInEditMode = () => {
        if (editMode) {
            const purchaseId = parseInt(props.match.params.purchaseId)
            const selectedPurchase = purchase.find(p => p.id === purchaseId) || {}
            setPurchase(selectedPurchase)
        }
    }

    useEffect(() => {
       getPurchase()
    }, [])

    useEffect(() => {
        getPurchaseInEditMode()
    }, [purchase])

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'lzvada')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/zvada/image/upload',
            {
            method: 'POST',
            body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }

    const constructNewPurchase = () => {

            if (editMode) {
                editPurchase({
                    id: purchases.id,
                    storeName: purchases.storeName,
                    city: purchases.city,
                    state: purchases.state,
                    price: purchases.price,
                    date: purchases.date,
                    userId: parseInt(localStorage.getItem("tourVana_username")),
                    attachementUrl: image,
                    groceries: purchases.groceries

                })
                    .then(() => props.history.push("/creditCardReport"))
            } else {
                addPurchase({
                    storeName: purchases.storeName,
                    city: purchases.city,
                    state: purchases.state,
                    price: purchases.price,
                    date: purchases.date,
                    userId: parseInt(localStorage.getItem("tourVana_username")),
                    attachementUrl: image,
                    groceries: purchases.groceries
                })
                    .then(() => props.history.push("/creditCardReport"))
            }
        }


    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "300px",
                borderRadius: "5rem"
            },
        },
        buttonStyle: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "180px",
                height: "20px",
                borderRadius: "5rem",
            },
        },
    }));
    
    const classes = useStyles()

    return (
        <form className="purchaseForm">
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="storeName"></label>
                    <input type="text" name="storeName" required autoFocus className="form-control"
                        placeholder="Store Name"
                        defaultValue={purchases.storeName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city"></label>
                    <input type="text" name="city" required className="form-control"
                        placeholder="City"
                        defaultValue={purchases.city}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="state"></label>
                    <input type="text" name="state" required className="form-control"
                        placeholder="State"
                        defaultValue={purchases.state}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price"></label>
                    <input type="text" name="price" required className="form-control"
                        placeholder="Price"
                        defaultValue={purchases.price}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"></label>
                    <input type="date" name="date" required className="form-control"
                        placeholder="Date"
                        defaultValue={purchases.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="groceries"></label>
                    <input type="checkbox" name="groceries" required className="checkbox"
                        placeholder="Groceries"
                        defaultValue={purchases.groceries}
                        onChange={handleControlledInputChange}
                    /> Groceries 
                </div>
                <div className="form-group">
                    <label htmlFor="restuarants"></label>
                    <input type="checkbox" name="restuarants" required className="checkbox"
                        placeholder="restuarants"
                        defaultValue={purchases.restuarants}
                        onChange={handleControlledInputChange}
                    /> Restuarants and Dining
                </div>
                <div className="form-group">
                    <label htmlFor="travel"></label>
                    <input type="checkbox" name="travel" required className="checkbox"
                        placeholder="travel"
                        defaultValue={purchases.travel}
                        onChange={handleControlledInputChange}
                    /> Travel
                </div>
            </fieldset> */}
            <section className="Upload">
                    <input className="uploadImage" type="file" name="file" placeholder="Upload an image"
                    onChange={uploadImage}
                    />
                    {
                        loading ? (<div className="loading">Loading...</div>) 
                        : (<img src={image} style={{ width: '300px' }} />)
                    }
            </section>
            <section className={classes.buttonStyle}>
                <Button className="savePurchaseButton" variant="contained" type="submit"
                    onClick={evt => {
                        evt.preventDefault() 
                        constructNewPurchase()
                    }}
                    className="btn btn-primary">
                    Save Purchase
                </Button>
            </section>
        </form>
    )
}