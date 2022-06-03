import React, { useEffect, useState } from 'react'
import { Results } from './Results'
import axios from 'axios'
import { PreviousSearches } from './PreviousSearches'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Prev } from 'react-bootstrap/esm/PageItem'


export const TripsSearch = () => {

    let [startLocation, setStartLocation] = useState()
    let [endLocation, setEndLocation] = useState()
    let [trips, setTrips] = useState()
    let [previousSearches, setPreviousSearches] = useState()
    let [isEmpty, setIsEmpty] = useState()
    let [cityDropDown, setCityDropDown] = useState()

    const searchTrips = (e) => {
        e.preventDefault()
        if (startLocation === endLocation) {
            toast.error("Please Select Different Start and End Locations !")
        } else {
            axios.get("http://localhost:8080/trips/" + startLocation + '/' + endLocation).then(res => {
                setTrips(res.data.data)
                let sendThis = {
                    userId: localStorage.getItem("userId"),
                    start: startLocation,
                    end: endLocation,
                }
                axios.post("http://localhost:8080/addsearch", sendThis).then(res => {
                    // console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
                // console.log(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }

    }

    useEffect(() => {
        axios.get("http://localhost:8080/addsearch/" + localStorage.getItem("userId")).then(res => {
            setPreviousSearches(res.data.data)
        }).catch(err => {
            console.log(err);
        })
        axios.get("http://localhost:8080/cities").then(res => {
            setCityDropDown(res.data.data)
        })
    }, [])
    return (
        <>
            {/* <div className='row refreshBar-row'>
                <div className='col-md-6 pl-4 pt-1'>
                    Search Trips
                </div>
                <div className='col-md-6'>
                    <button className='btn btn-light float-right' onClick={searchTrips}><i className='fa fa-refresh'></i></button>
                </div>
            </div> */}
            <div className='wrapper-trips-search'>
                <div className="searchbar">
                    <form onSubmit={searchTrips}>
                        <div className='wrapper-search'>
                            <div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <label>Start Location</label>
                                        <select name="startLocation" className="form-control" onChange={(e) => setStartLocation(e.target.value)}>
                                            <option value="default" defaultValue={true}>Start Location</option>
                                            {
                                                cityDropDown !== undefined ?
                                                    cityDropDown.map(ele => {
                                                        return (
                                                            < option key={ele._id} value={ele.cityName}>{ele.cityName}</option>
                                                        )
                                                    }) : null
                                            }
                                        </select>
                                    </div>
                                    <div className='col-md-4'>
                                        <label>End Location</label>
                                        <select name="startLocation" className="form-control" onChange={(e) => setEndLocation(e.target.value)}>
                                            <option value="default" defaultValue={true}>End Location</option>
                                            {
                                                cityDropDown !== undefined ?
                                                    cityDropDown.map(ele => {
                                                        return (
                                                            < option key={ele._id} value={ele.cityName}>{ele.cityName}</option>
                                                        )
                                                    }) : null
                                            }
                                        </select>
                                    </div>
                                    <div className='col-md-4 text-center'>
                                        <button className='btn btn-primary searchbar-btn' type="submit">Search Rides <i className="fa fa-search ml-4"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <div className="text-center">Previous Searches</div>
                                {
                                    previousSearches !== undefined ?
                                        previousSearches.map(ele => {
                                            return (<PreviousSearches searches={ele} setStartLocation={setStartLocation} setEndLocation={setEndLocation} />)
                                        }) : null
                                } */}

                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {
                        trips !== undefined ? (
                            <Results trips={trips} />
                        ) : (
                            null
                        )
                    }
                </div>
            </div>
        </>
    )
}
