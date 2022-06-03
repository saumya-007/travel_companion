import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'

export const Message = ({ own, message }) => {
    // console.log(message);
    let [photo, setPhoto] = useState()
    useEffect(() => {
        axios.get("http://localhost:8080/users/" + message.sender).then(res => {
            setPhoto(res.data.data.profilephoto);
        }).catch(err => {
            console.log(err);
        })
    })
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <img className="messageImg" src={`/images/` + photo} alt="profile pic"></img>
                <p className='messageText'>
                    {message.text}
                </p>
            </div>
            <div className='messageBottom'>{format(message.createdAt)}</div>
        </div>
    )
}
