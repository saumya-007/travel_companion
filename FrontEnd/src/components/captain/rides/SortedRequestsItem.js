import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SortedRequestsItem = (props) => {

    let [disabled, setDisabled] = useState()
    let [status, setStatus] = useState("")
    const apiCall = (sendThis) => {
        axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/tripPassengers`, sendThis).then(res => {
            setDisabled(true)
        }).catch(err => {
            console.log(err)
        })
    }
    const requestAccept = () => {
        if (window.confirm("Accept Request from" + props.data.user.firstName + " ?")) {
            toast.success("Request Accepted!")
            let sendThis = {
                tripPassengerId: props.data._id,
                isAccepted: "accepted",
            }
            apiCall(sendThis)
            //UPON ACCEPT SET CONVERSATION
            let sendItem = {
                senderId: localStorage.getItem('userId'),
                receiverId: props.data.user._id,
                trip: props.data.trip._id
            }
            setStatus("changedtoaccepted")
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/conversations`, sendItem).then(res => {
            }).catch(err => {
                console.log(err)
            })
        }
    }
    const requestReject = () => {
        if (window.confirm("Reject Request from" + props.data.user.firstName + " ?")) {
            toast.error("Request Rejected!")
            let sendThis = {
                tripPassengerId: props.data._id,
                isAccepted: "rejected",
            }
            apiCall(sendThis)
            setStatus("changedtorejected")
        }
    }
    useEffect(() => {
        if (props.data.isAccepted !== "requested") {
            setDisabled(true)
        }
    },[props.data.isAccepted])
    return (
        <>
            <div className="au-message__item-inner">
                <div className="au-message__item-text">
                    <div className="avatar-wrap">
                        <div className="avatar">
                            <img src={`/images/` + props.data.user.profilephoto} alt={props.data.user.firstName} />
                        </div>
                    </div>
                    <div className="text">
                        <h5 className="name">{props.data.user.firstName}</h5>
                        <p>Have sent a Request</p>
                    </div>
                </div>
                <div>
                    Contact : {props.data.user.phoneNumber}
                </div>
                <div>
                    Gender : {props.data.user.gender}
                </div>
                {
                    status === "changedtoaccepted" ?
                        <div className="accepted">
                            accepted
                        </div> :
                        (status === "changedtorejected" ?
                            <div className="rejected">
                                rejected
                            </div> :
                            <div className={props.data.isAccepted}>
                                {props.data.isAccepted}
                            </div>)
                }
                <div>
                    <button className="btn btn-success mr-3" onClick={requestAccept} disabled={disabled}><i className="fa fa-check"></i></button>
                    <button className="btn btn-danger" onClick={requestReject} disabled={disabled}><i className="fa fa-trash"></i></button>
                </div>
            </div>
        </>
    )
}
