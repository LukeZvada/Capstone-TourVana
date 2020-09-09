import React, { useState } from 'react'
import CachedIcon from '@material-ui/icons/Cached';


export const Cloudinary = () => {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
  
    const uploadImage = async e => {
      const files = e.target.files
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'lzvada')
      setLoading(true)
      const res = await fetch(
        '	https://api.cloudinary.com/v1_1/zvada/image/upload',
        {
          method: 'POST',
          body: data
        }
      )
      const file = await res.json()
  
      setImage(file.secure_url)
      setLoading(false)
    }
  
    return (
      <div className="Upload">
        <input
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
        />
        {loading ? (
          <h3><CachedIcon /></h3>
        ) : (
          <img src={image} style={{ width: '300px' }} />
        )}
      </div>
    )
  }
  
