import React, { useState, useContext, useEffect } from "react"
import { SettlementImageContext } from "./SettlementsProvider"
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
        
        return (
            <section className="settlement--card">

                <div className="Upload">
                    <input type="file" name="file" placeholder="Upload an image"
                    onChange={uploadImage}
                    />
                    {
                        loading ? (<h3>It's getting it ...</h3>) 
                        : (<img src={image} style={{ width: '300px' }} />)
                    }
                </div>
                <div className="saveImageButton">
                    <button className="saveSettlementImageButton" variant="contained" type="submit"
                            onClick={evt => {
                                evt.preventDefault()
                                constructNewSettlementImage()
                            }}
                            className="btn btn-primary">
                            Save Settlement
                    </button>
                </div>
            </section>
        )
}