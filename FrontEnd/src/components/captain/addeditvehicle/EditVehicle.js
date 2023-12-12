/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AddVehicle } from './AddVehicle'
import { UpdateVehicle } from './UpdateVehicle'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditVehicle = () => {
    let user_id = localStorage.getItem('userId')
    const [data, setData] = useState();
    let [deleted, setDeleted] = useState('');
    let [added, setAdded] = useState('');
    let [update, setUpdated] = useState('');
    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/vehicles/` + user_id).then(res => {
            setData(res.data.data);
            setDeleted("deletedcalled")
            setAdded("addedcalled")
            setUpdated("updatedcalled")
        }).catch(err => {
            console.log(err)
        })
    }, [])
    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/vehicles/` + user_id).then(res => {
            setData(res.data.data);
            setDeleted("deletedcalled")
            setAdded("addedcalled")
            setUpdated("updatedcalled")
        }).catch(err => {
            console.log(err)
        })
    }, [added, deleted, update])
    // useEffect(async () => {
    //     await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/vehicles/` + user_id).then(res => {
    //         setData(res.data.data);
    //         setDeleted("deletedcalled")
    //         setAdded("addedcalled")
    //         setUpdated("updatedcalled")
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [deleted])
    // useEffect(async () => {
    //     await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/vehicles/` + user_id).then(res => {
    //         setData(res.data.data);
    //         setDeleted("deletedcalled")
    //         setAdded("addedcalled")
    //         setUpdated("updatedcalled")
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [update])
    return (
        <>
            <div className='card'>
                <div className="card-header">
                    <strong>Add Vehicle</strong>
                </div>
                <div className="card-body p-5">
                    <div>
                        <div className='p-3'>
                            <AddVehicle setAdded={setAdded} />
                        </div>
                        <div className='mt-5'>
                            {
                                data !== undefined ? (
                                    <UpdateVehicle data={data} setDeleted={setDeleted} setUpdated={setUpdated} />
                                ) : (
                                    null
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                style={{ marginTop: "80px" }}
            />
        </>
    )
}
