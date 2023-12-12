import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ScheduledTripsDetails = ({ data, setDeleted }) => {
    let navigate = useNavigate()
    const deleteTrip = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/trips/` + data._id).then(res => {
            setDeleted("deleted")
            toast.success("Deleted Successfully !")
        }).catch(err => {
            console.log(err)
        })
    }
    const gotoMaps = () => {
        navigate('/maps/' + data.startLocationCity.latitude.$numberDecimal + '/' + data.startLocationCity.longitude.$numberDecimal + '/' + data.endLocationCity.latitude.$numberDecimal + '/' + data.endLocationCity.longitude.$numberDecimal)
    }
    return (
        <>
            <tr>
                <td>{data.startLocationCity.cityName}</td>
                <td>{data.endLocationCity.cityName}</td>
                <td>{data.tripDate}</td>
                <td>{data.tripTime}</td>
                {
                    (data.vehicle === null) ?
                        <td>Vehicle Deleted</td> : <td>{data.vehicle.vehicleName}</td>
                }
                <td>{data.customFairAmount} <small>({data.baseFairType})</small></td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={deleteTrip}><i className="fa fa-trash"></i></button>
                </td>
                <td>
                    <button className="btn btn-info btn-sm" onClick={gotoMaps}><i className="fa fa-eye"></i> View Ride</button>
                </td>
            </tr>
        </>
    )
}
