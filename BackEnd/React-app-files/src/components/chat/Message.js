import React from 'react'
import { format } from 'timeago.js'

export const Message = ({ own, message }) => {
    // console.log(message);
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <img className="messageImg" src="/images/profilePic.jpg" alt="profile pic"></img>
                <p className='messageText'>
                    {message.text}
                </p>
            </div>
            <div className='messageBottom'>{format(message.createdAt)}</div>
        </div>
    )
}
