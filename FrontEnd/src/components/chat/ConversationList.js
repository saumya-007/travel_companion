/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ConversationList = ({ conversations, connectedUsers }) => {
    let [patronName, setPatronName] = useState()
    let [patronId, setPatronId] = useState()
    let [profilephoto, setProfilePhoto] = useState()
    const includesUsers = (value, list) => {
        let found = false;
        let position = -1;
        let index = 0;

        while (!found && index < list.length) {
            if (list[index] === value) {
                found = true;
                position = index;
            } else {
                index += 1;
            }
        }
        return list[position];
    }
    useEffect(() => {
        const patronUser = conversations.members.find((member) => member !== localStorage.getItem("userId"))
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/` + patronUser).then(res => {
            setPatronId(res.data.data._id)
            // includesUsers(res.data.data._id,)
            setPatronName(res.data.data.firstName);
            setProfilePhoto(res.data.data.profilephoto);
        }).catch(err => {
            console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='conversation'>
                {
                    connectedUsers !== undefined ?
                        (connectedUsers.includes(patronId) ?
                            <div className="avatar-wrap online mr-3">
                                <div className="avatar">
                                    <img src={`/images/` + profilephoto} />
                                </div>
                            </div>
                            :
                            <div className="avatar-wrap mr-3">
                                <div className="avatar">
                                    <img src={`/images/` + profilephoto} />
                                </div>
                            </div>)
                        :
                        <div className="avatar-wrap mr-3">
                            <div className="avatar">
                                <img src={`/images/` + profilephoto} />
                            </div>
                        </div>
                }
                <span className='conversationName'>{patronName}<br />
                    <small>
                        {conversations.associatedTrip.startLocationCity.cityName} to {conversations.associatedTrip.endLocationCity.cityName}<br />
                        {conversations.associatedTrip.tripDate} at {conversations.associatedTrip.tripTime}
                    </small>
                </span>
            </div>
        </>
    )
}
