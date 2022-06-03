import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddVehicle = (props) => {
    //SETTIGN STATE VARIABLES
    let [vehicleName, setVehicleName] = useState('')
    let [vehicleCategory, setVehicleCategory] = useState('')
    let [vehicleCapacity, setVehicleCapacity] = useState('')
    let [registrationNumber, setRegistrationNumber] = useState('')
    let [insuranceURL, setInsuranceURL] = useState('')

    let [category, setCategory] = useState()
    let [capacity, setCapacity] = useState()

    //INITIATION USEREF
    let vName = useRef()
    let rNumber = useRef()
    let iURL = useRef()

    //FUNCTION TO UPDATE SENDTHIS
    const updateSendThisData = () => {
        if (vName.current.value !== "")
            setVehicleName(vName.current.value);
        if (rNumber.current.value !== "")
            setRegistrationNumber(rNumber.current.value);
        if (iURL.current.value !== "")
            setInsuranceURL(iURL.current.value);
    }
    //FUNCTION TO SET VALUES TO NULL WHEN ADDED ADDED
    const checkAdded = () => {
        vName.current.value = ""
        rNumber.current.value = ""
        iURL.current.value = ""
        setCapacity("default")
        setCategory("defalut")
    }
    //FUNCTION TO ADD DETAILS
    const addVehicleDetails = (e) => {
        e.preventDefault();
        console.log(vehicleCapacity, vehicleCategory)
        if (vehicleCapacity === "default" || vehicleCapacity === undefined) {
            toast.error("Please Select Capacity")
        }
        else if (vehicleCategory === "default" || vehicleCategory === undefined) {
            toast.error("Please Select Category")
        }
        else {
            let sendThis = {
                user: localStorage.getItem('userId'),
                vehicleName: vehicleName,
                vehicleCapacity: vehicleCapacity,
                vehicleCategory: vehicleCategory,
                registrationNumber: registrationNumber,
                insuranceURL: insuranceURL,
                isActive: false,
            }
            axios.post("http://localhost:8080/vehicles", sendThis).then(res => {
                // console.log(res)
                props.setAdded("added")
                checkAdded()
                toast.success("Vehicle Added Successfully !")
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => {
            // console.log(res.data.data)
            setCategory(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <>
            <form onSubmit={addVehicleDetails} className="form-horizontal">
                <div className="row form-group">
                    <div className="col col-md-4">
                        <label htmlFor="vehicleName-input" className=" form-control-label">Vehicle Name</label>
                        <input type="text" id="vehicleName-input" name="vehicleName-input" ref={vName} placeholder="Vehicle Name" className="form-control" required />

                    </div>
                    <div className="col col-md-4">
                        <label htmlFor="vehicleCategory-input" className=" form-control-label">Vehicle Category</label>
                        <select className="form-control" onChange={(e) => { setVehicleCategory(e.target.value) }}>
                            <option value="default">Vehicle Category</option>
                            {
                                category !== undefined ?
                                    category.map(ele => {
                                        // console.log(ele.category)
                                        return (
                                            <option key={ele._id} value={ele.category}>{ele.category}</option>
                                        )

                                    }) : null
                            }
                        </select>
                    </div>
                    <div className="col col-md-4">
                        <label htmlFor="vehicleCapacity-input" className=" form-control-label">Vehicle Capacity</label>
                        <select className="form-control" onChange={(e) => setVehicleCapacity(e.target.value)}>
                            <option value="default">Vehicle Capacity</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col col-md-4">
                        <label htmlFor="registrationNumber-input" className=" form-control-label">Registration Number</label>
                        <input type="text" id="registrationNumber-input" name="registrationNumber-input" ref={rNumber} placeholder="registrationNumber" className="form-control" required />

                    </div>
                    <div className="col col-md-4">
                        <label htmlFor="insuranceURL-input" className=" form-control-label">Insurance URL</label>
                        <input type="text" id="insuranceURL-input" name="insuranceURL-input" ref={iURL} placeholder="insuranceURL" className="form-control" required />

                    </div>
                    <div className="col-12 col-md-4">
                        <div className='text-center pt-4'>
                            <button type="submit" className="btn btn-primary" onClick={updateSendThisData}>
                                Add Vehicle
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}
