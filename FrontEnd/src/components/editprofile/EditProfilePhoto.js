import axios from 'axios'
import React, { useState } from 'react'

export const EditProfilePhoto = () => {
    let [fileName, setFileName] = useState('')
    const onChangeFile = e => {
        setFileName(e.target.files[0])
    }
    let formData = new FormData()
    formData.append("profilephoto", fileName)
    formData.append("userId", localStorage.getItem("userId"))
    localStorage.setItem("profilephoto", fileName.name)
    const updateProfilePhoto = async (e) => {
        e.preventDefault()
        await axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/profilephotoupdate`, formData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <form onSubmit={updateProfilePhoto} encType="multipart/form-data">
                <div className='card'>
                    <div className='flex-container card-header p-3'>
                        <div className='font-weight-bold'>
                            Profile Photo
                        </div>
                        <div>
                            <input type="file" accept="image/*" onChange={onChangeFile} filename="profilephoto" name="profilephoto" />
                        </div>
                        <div>
                            <button className='btn btn-primary'>Update Photo</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
