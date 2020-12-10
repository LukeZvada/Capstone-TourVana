import React, { useState, useContext, useEffect } from "react"
import { SettlementImageContext } from "./SettlementsProvider"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ShowContext } from "../shows/ShowsProvider"

export const SettlementImageUpload = (props) => {
        const [image, setImage] = useState('')
        const [loading, setLoading] = useState(false)
        const { addSettlementImage } = useContext(SettlementImageContext)
        const [settlementShowId, setSettlementShowId] = useState({})

        const getShowForSettlement = () => {
            console.log(props.match.params.showId)
            const showId = parseInt(props.match.params.showId)
            setSettlementShowId(showId)
        }

        useEffect(() => {
            getShowForSettlement()
        }, [])

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
           
        const constructNewSettlementImage = () => {
            console.log(settlementShowId)
            addSettlementImage({
                attachmentUrl: image,
                showId: settlementShowId
            })
            .then(() => props.history.push("/settlement"))
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
                    borderRadius: "5rem",
                },
            },
        }));
        
        const classes = useStyles()
        
        return (
            <section className="settlement--card">
                <article className="uploadStyle">
                    <div className="Upload">
                        <input className="uploadImgSettlement" type="file" name="file" placeholder="Upload an image"
                        onChange={uploadImage}
                        />
                            <img className="imgSettlement" src={image} style={{ width: '400px' }} />
                        
                    </div>
                </article>
                <article className="saveSettlementButton">
                    <div className={classes.buttonStyle}>
                        <Button className="saveSettlementImageButton" variant="contained" type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewSettlementImage()
                                }}
                                className="btn btn-primary">
                                Save Settlement
                        </Button>
                    </div>
                </article>
            </section>
        )
}


