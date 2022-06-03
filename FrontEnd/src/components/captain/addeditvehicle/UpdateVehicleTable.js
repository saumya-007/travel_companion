import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateVehicleTable = (props) => {
    let regex = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
    let data = props.data
    console.log(data)
    let [vehicleName, setVehicleName] = useState(data.vehicleName)
    let [vehicleCategory, setVehicleCategory] = useState(data.vehicleCategory)
    let [vehicleCapacity, setVehicleCapacity] = useState(data.vehicleCapacity)
    let [registrationNumber, setRegistrationNumber] = useState(data.registrationNumber)
    // let [insuranceURL, setInsuranceURL] = useState(data.insuranceURL)
    let [dropDown, setDropDown] = useState()
    let [tempCategory, setTempCategory] = useState(data.vehicleCategory)
    let [tempCapacity, setTempCapacity] = useState(data.vehicleCapacity)

    let form = useRef()

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
        // if (iURL.current.value !== "")
        //     setInsuranceURL(iURL.current.value);
    }

    //FUNCTION TO ADD DETAILS
    const updateVehicleDetails = (e) => {
        e.preventDefault();
        if (!registrationNumber.match(regex)) {
            toast.error("Invalid Registration Number")
        } else {
            let sendThis = {
                vehicleId: data._id,
                vehicleName: vehicleName,
                vehicleCapacity: tempCapacity,
                vehicleCategory: tempCategory,
                registrationNumber: registrationNumber,
                // insuranceURL: insuranceURL,
            }

            axios.put("http://localhost:8080/vehicles", sendThis).then(res => {
                // console.log(res)
                props.setUpdated("updated")
                if (tempCategory !== "")
                    setVehicleCategory(tempCategory)
                if (tempCapacity !== "")
                    setVehicleCapacity(tempCapacity)
                toast.success("Vehicle Updated Successfully !")
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const deleteVehicle = () => {
        if (window.confirm("Are you sure about removing the vehicle ?")) {
            axios.delete("http://localhost:8080/vehicles/" + data._id).then(res => {
                // console.log(res.data)
                props.setDeleted("deleted")
                toast.success("Vehicle Deleted Successfully !")
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => {
            // console.log(res.data.data)
            setDropDown(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <>
            <tr className="tr-shadow">
                <td>{vehicleName}</td>
                <td>{vehicleCategory}</td>
                <td>{vehicleCapacity}</td>
                <td>{registrationNumber}</td>
                {/* <td>{insuranceURL}</td> */}
                <td>
                    <div>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target={'#' + data._id} title="Edit" >
                            <i className="zmdi zmdi-edit"></i>
                        </button>
                        <button type="button" className="btn btn-danger ml-3" data-toggle="tooltip" data-placement="top" title="Send" onClick={deleteVehicle}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>

            <div className="modal fade" id={data._id} tabIndex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <form onSubmit={updateVehicleDetails}
                            ref={form}
                            className="form-horizontal">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mediumModalLabel">Edit Vehicle</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="row form-group">
                                    <div className="col col-md-6">
                                        <label htmlFor="vehicleName-input" className=" form-control-label">Vehicle Name</label>
                                        <input type="text" id="vehicleName-input" name="vehicleName-input" ref={vName} placeholder={vehicleName} className="form-control" />

                                    </div>
                                    <div className="col col-md-6">
                                        <label htmlFor="vehicleCategory-input" className=" form-control-label">Vehicle Category</label>
                                        <select onChange={(e) => setTempCategory(e.target.value)} className="form-control">
                                            <option value={vehicleCategory} defaultValue={true}>{vehicleCategory}</option>
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
                                    <div className="col col-md-6">
                                        <label htmlFor="vehicleCapacity-input" className=" form-control-label">Vehicle Capacity</label>
                                        {/* <input type="text" id="vehicleCapacity-input" name="vehicleCapacity-input" ref={vCapacity} placeholder="Vehicle Capacity" className="form-control" required /> */}
                                        <select onChange={(e) => setTempCapacity(e.target.value)} className="form-control">
                                            <option value={vehicleCapacity} defaultValue={true}>{vehicleCapacity}</option>
                                            <option value="2">2</option>
                                            <option value="5">5</option>
                                            <option value="7">7</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className="col col-md-6">
                                        <label htmlFor="registrationNumber-input" className=" form-control-label">Registration Number</label>
                                        <input type="text" id="registrationNumber-input" name="registrationNumber-input" ref={rNumber} placeholder={registrationNumber} className="form-control" />

                                    </div>
                                    {/* <div className="col col-md-6">
                                        <label htmlFor="insuranceURL-input" className=" form-control-label">Insurance URL</label>
                                        <input type="text" id="insuranceURL-input" name="insuranceURL-input" ref={iURL} placeholder={insuranceURL} className="form-control" />

                                    </div> */}
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={updateSendThisData}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
