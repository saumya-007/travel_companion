import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SortedRequests } from './SortedRequests';
import { useNavigate, Link } from 'react-router-dom';

export const Requests = () => {

    let navigate = useNavigate()
    let count = 0
    let [tripsRequest, setTripRequests] = useState();
    useEffect(() => {
        axios.get('http://localhost:8080/tripPassengers/' + localStorage.getItem("userId")).then(res => {
            setTripRequests(res.data.data)
            // console.log(res.data.data);
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
