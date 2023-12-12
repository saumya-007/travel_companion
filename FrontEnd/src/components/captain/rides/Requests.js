/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SortedRequests } from './SortedRequests';
import { useNavigate, Link } from 'react-router-dom';

export const Requests = () => {

    let navigate = useNavigate()
    let count = 0
    let [tripsRequest, setTripRequests] = useState();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/tripPassengers/` + localStorage.getItem("userId")).then(res => {
            setTripRequests(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <>
            {
                tripsRequest !== undefined ?
                    tripsRequest.map(ele => {
                        count++
                        return (<SortedRequests key={count} data={ele} />)
                    }) :
                    null
            }
        </>
    )
}
