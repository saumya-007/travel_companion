import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const ResultsList = ({ trips }) => {

    let [status, setStatus] = useState();
    let navigate = useNavigate()
    let user_id = localStorage.getItem("userId")
    const addTripPassenger = async () => {
        if (window.confirm("Send a request to " + trips.user.firstName + " ?")) {
            toast.success("Request sent!")
            setStatus("requested")
            let sendThis = {
                trip: trips._id,
                user: user_id,
                isAccepted: "requested",
            }
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/tripPassengers`, sendThis).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const addConversation = () => {
        navigate('/patrondashboard/chats')
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/tripPassengerStatus/` + trips._id + "/" + localStorage.getItem("userId")).then(res => {
            if (res) {
                if (res.data.data[0] === undefined) {
                    setStatus("N/A")
                }
                else {
                    setStatus(res.data.data[0].isAccepted)
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }, [trips._id])
    return (
        <>
            {
                <tr>
                    <td>{trips.user.firstName}</td>
                    <td>{trips.startLocationCity.cityName}</td>
                    <td>{trips.endLocationCity.cityName}</td>
                    <td>{trips.tripDate}</td>
                    <td>{trips.tripTime}</td>
                    <td>{trips.vehicle.vehicleName}</td>
                    <td>{trips.customFairAmount} <small>{trips.baseFairType}</small></td>
                    <td className={status}>{status}</td>
                    <td><button className="btn btn-success btn-sm" onClick={addTripPassenger} disabled={status !== "N/A" ? true : false}><i className='fa fa-user-plus'></i></button></td>
                    <td><button className="btn btn-dark btn-sm" onClick={addConversation} disabled={status === "accepted" ? false : true}><i className="fa fa-comment-alt"></i></button></td>
                </tr>
            }
        </>
    )
}
