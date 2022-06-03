import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ConversationList = ({ conversations, connectedUsers }) => {
    // console.log(conversations)
    let [patronName, setPatronName] = useState()
    let [patronId, setPatronId] = useState()
    let [profilephoto, setProfilePhoto] = useState()
    const includesUsers = (value, list) => {
        let found = false;
        let position = -1;
        let index = 0;

        while (!found && index < list.length) {
            if (list[index] == value) {
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
        axios.get("http://localhost:8080/users/" + patronUser).then(res => {
            // console.log(res.data.data.profilephoto)
            // console.log(connectedUsers.includes(patronId))
            // console.log(includesUsers(res.data.data._id, connectedUsers))
            setPatronId(res.data.data._id)
            // includesUsers(res.data.data._id,)
            setPatronName(res.data.data.firstName);
            setProfilePhoto(res.data.data.profilephoto);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <>
            <div className='conversation'>
                {
                    connectedUsers !== undefined ?
                        (connectedUsers.includes(patronId) ?
                            <div className="avatar-wrap online mr-3">
                                <div className="avatar">
                                    {console.log(profilephoto)}
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
