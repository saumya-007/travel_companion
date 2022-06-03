import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddVehicle = (props) => {

    let form = useRef()

    //SETTIGN STATE VARIABLES
    let [vehicleName, setVehicleName] = useState('')
    let [vehicleCategory, setVehicleCategory] = useState('')
    let [vehicleCapacity, setVehicleCapacity] = useState('')
    let [registrationNumber, setRegistrationNumber] = useState('')
    let [dropDown, setDropDown] = useState()

    //INITIATION USEREF
    let vName = useRef()
    let rNumber = useRef()
    // let iURL = useRef()

    //FUNCTION TO UPDATE SENDTHIS
    const updateSendThisData = () => {
        if (vName.current.value !== "")
            setVehicleName(vName.current.value);
        if (rNumber.current.value !== "")
            setRegistrationNumber(rNumber.current.value);
    }
    //FUNCTION TO ADD DETAILS
    const addVehicleDetails = (e) => {
        e.preventDefault();
        let regex = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
        if ((vehicleCapacity === "default" || vehicleCapacity === undefined) && (vehicleCategory === "default" || vehicleCategory === undefined)) {
            toast.error("Select Capacity and Category")
        }
        else if (vehicleCapacity === "default" || vehicleCapacity === undefined) {
            toast.error("Select Vehicle Capacity")
        }
        else if (vehicleCategory === "default" || vehicleCategory === undefined) {
            toast.error("Select Vehicle Category")
        }
        else if (!registrationNumber.match(regex)) {
            toast.error("Invalid Registration Number")
        }
        else {
            let sendThis = {
                user: localStorage.getItem('userId'),
                vehicleName: vehicleName,
                vehicleCapacity: vehicleCapacity,
                vehicleCategory: vehicleCategory,
                registrationNumber: registrationNumber,
                isActive: false,
            }
            axios.post("http://localhost:8080/vehicles", sendThis).then(res => {
                console.log(res)
                props.setAdded("added")
                setVehicleCapacity("default")
                form.current.reset()
                toast.success("Vehicle Added Successfully !")
            }).catch(err => {
                console.log(err)
            })
        }
    }
    useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => {
            setDropDown(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <>
            <form onSubmit={addVehicleDetails} className="form-horizontal" ref={form}>
                <div className="row form-group">
                    <div className="col col-md-4">
                        <label htmlFor="vehicleName-input" className=" form-control-label">Vehicle Name</label>
                        <input type="text" id="vehicleName-input" name="vehicleName-input" ref={vName} placeholder="Vehicle Name" className="form-control" required />

                    </div>
                    <div className="col col-md-4">
                        <label htmlFor="vehicleCategory-input" className=" form-control-label">Vehicle Category</label>
                        <select onChange={(e) => setVehicleCategory(e.target.value)} className="form-control">
                            <option value="default" defaultValue={true}>Select Capacity</option>
                            {
                                dropDown !== undefined ?
                                    dropDown.map(ele => {
                                        return (
                                            <option value={ele.category} key={ele._id}>{ele.category}</option>
                                        )
                                    }) : null
                            }
                        </select>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col col-md-4">
                        <label htmlFor="vehicleCapacity-input" className=" form-control-label">Vehicle Capacity</label>
                        <select onChange={(e) => setVehicleCapacity(e.target.value)} className="form-control">
                            <option value="default" defaultValue={true}>Select Capacity</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="col col-md-4">
                        <label htmlFor="registrationNumber-input" className=" form-control-label mr-2">Registration Number </label><small>Format : MP 09 AB 1234</small>
                        <input type="text" id="registrationNumber-input" name="registrationNumber-input" ref={rNumber} placeholder="registrationNumber" className="form-control" required />
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
