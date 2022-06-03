import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ScheduleTrip = (props) => {

    let vehicles = props.vehicles
    let user_id = localStorage.getItem('userId')
    let count = 0;

    let [startLocation, setStartLocation] = useState()
    let [endLocation, setEndLocation] = useState()
    let [vehicle, setVehicle] = useState()
    let [fairType, setFairType] = useState()
    let [fair, setFair] = useState()
    let [cityDropDown, setCityDropDown] = useState()

    //SETTING REFERENCE TO DATETIME AND SETTING VALUE
    let dateElement = useRef()
    let fairAmount = useRef()

    const onTripAdd = () => {
        setFair(fairAmount.current.value);
    }

    const setTrip = (e) => {
        e.preventDefault()
        //DATE FORMAT
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
            return [
                padTo2Digits(date.getDate()),
                padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/');
        }
        //TIME FORMAT
        function formatTime(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
        let date = new Date(dateElement.current.value)
        let tripDate = formatDate(date);
        let tripTime = formatTime(date);

        if (startLocation === (undefined || "default") || endLocation === (undefined || "default") ||
            fairType === (undefined || "default") || vehicle === (undefined || "default")
            || fair === "" || isNaN(date)
        ) {
            toast.error("Invalid Input !")
        }
        else {
            let sendThis = {
                user: user_id,
                vehicle: vehicle,
                startLocation: startLocation,
                endLocation: endLocation,
                tripDate: tripDate,
                tripTime: tripTime,
                fairType: fairType,
                customFairAmount: fair,
            }
            axios.post("http://localhost:8080/trips", sendThis).then(res => {
                // console.log(res)
                props.setAdded("added")
                toast.success("Trip Added Succesfully !")
            }).catch(err => {
                console.log(err.data.data)
            })
        }
    }
    useEffect(() => {
        axios.get("http://localhost:8080/cities").then(res => {
            setCityDropDown(res.data.data)
        })
    }, [])
    return (
        <>
            <div className="card mt-1">
                <div className="card-body p-5">
                    <form onSubmit={setTrip}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="control-label mb-1">Start Location</label>
                                        {/* <input name="startLocation" type="text" className="form-control" aria-required="true" aria-invalid="false" value="" /> */}
                                        <select name="startLocation" className="form-control" onChange={(e) => { setStartLocation(e.target.value) }}>
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
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label mb-1">End Location</label>
                                    {/* <input name="endLocation" type="text" className="htmlForm-control" aria-required="true" aria-invalid="false" value="" /> */}
                                    <select name="endLocation" className="form-control" onChange={(e) => { setEndLocation(e.target.value) }}>
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
                                <div className="col-md-4">
                                    <label className="control-label mb-1">When</label>
                                    <input type="datetime-local" className="form-control" ref={dateElement}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label mb-1">Choose Vehicle</label>
                                    <select name="endLocation" className="form-control" onChange={(e) => { setVehicle(e.target.value) }}>
                                        <option value="default" defaultValue={true}>Select Vehicle</option>
                                        {
                                            vehicles.map(ele =>
                                                <option value={ele} key={ele}>{ele}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label mb-1">Select Fair Type</label>
                                    <select name="fairtype" className="form-control" onChange={(e) => { setFairType(e.target.value) }}>
                                        <option value="default" defaultValue={true}>Select Fair Type</option>
                                        <option value="priceperkm">Price Per Km</option>
                                        <option value="fixedprice">Fixed Price</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label mb-1">Enter fair</label>
                                    <input type="text" className="form-control" ref={fairAmount} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12 text-center pt-2">
                                    <button type="submit" className="btn btn-lg btn-info" onClick={onTripAdd}>
                                        Schedule Trip
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
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
