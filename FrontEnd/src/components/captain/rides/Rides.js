/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ScheduleTrip } from './ScheduleTrip'
import { ScheduledTrips } from './ScheduledTrips'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
export const Rides = () => {

    let [vehicles, setVehicles] = useState()
    let [trips, setTrips] = useState()
    let [deleted, setDeleted] = useState();
    let [added, setAdded] = useState();

    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/vehicles/` + localStorage.getItem('userId')).then(res => {
            let vehicleName = []
            res.data.data.map(ele => vehicleName.push(ele.vehicleName))
            setVehicles(vehicleName)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/trips/` + localStorage.getItem('userId')).then(res => {
            setTrips(res.data.data)
            setDeleted("deletedcalled")
            setAdded("addedcalled")
        }).catch(err => {
            console.log(err)
        })
    }, [])
    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/trips/` + localStorage.getItem('userId')).then(res => {
            setTrips(res.data.data)
            setDeleted("deletedcalled")
            setAdded("addedcalled")
        }).catch(err => {
            console.log(err)
        })
    }, [added])
    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/trips/` + localStorage.getItem('userId')).then(res => {
            setTrips(res.data.data)
            setDeleted("deletedcalled")
            setAdded("addedcalled")
        }).catch(err => {
            console.log(err)
        })
    }, [deleted])
    return (
        <>

            <div className='pt-5'>
                {
                    vehicles !== undefined && trips !== undefined ? (
                        < ScheduleTrip vehicles={vehicles} key={vehicles} setAdded={setAdded} />
                    ) : (
                        null
                    )
                }
            </div>
            <div>
                <ScheduledTrips trips={trips} setDeleted={setDeleted} />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                style={{ marginTop: "80px" }}
            />
        </>
    )
}
