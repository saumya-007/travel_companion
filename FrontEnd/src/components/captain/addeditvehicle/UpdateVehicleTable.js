import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateVehicleTable = (props) => {
    let regex = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
    let data = props.data
    let [vehicleName, setVehicleName] = useState(data.vehicleName)
    let [vehicleCategory, setVehicleCategory] = useState(data.vehicleCategory)
    let [vehicleCapacity, setVehicleCapacity] = useState(data.vehicleCapacity)
    let [registrationNumber, setRegistrationNumber] = useState(data.registrationNumber)
    let [vehicleCapacityList, setVehicleCapacityList] = useState([]);

    let [dropDown, setDropDown] = useState()
    let [tempCategory, setTempCategory] = useState(data.vehicleCategory)
    let [tempCapacity, setTempCapacity] = useState(data.vehicleCapacity)

    let form = useRef()

    //INITIATION USEREF
    let vName = useRef()
    let rNumber = useRef()

    //FUNCTION TO UPDATE SENDTHIS
    const updateSendThisData = () => {
        if (vName.current.value !== "")
            setVehicleName(vName.current.value);
        if (rNumber.current.value !== "")
            setRegistrationNumber(rNumber.current.value);
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
            }

            axios.put(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/vehicles`, sendThis).then(res => {
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
            axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/vehicles/` + data._id).then(res => {
                props.setDeleted("deleted")
                toast.success("Vehicle Deleted Successfully !")
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/category`).then(res => {
            setDropDown(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (dropDown) {
            const currentCategory = tempCategory || vehicleCategory
            
            dropDown.forEach((item) => {
                if (item.category === currentCategory) {
                    setVehicleCapacityList(item.categoryCapacity)
                }
            })
        }
    }, [dropDown, vehicleCategory, tempCategory])
    return (
        <>
            <tr className="tr-shadow">
                <td>{vehicleName}</td>
                <td>{vehicleCategory}</td>
                <td>{vehicleCapacity}</td>
                <td>{registrationNumber}</td>
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
                                        <select onChange={(e) => setTempCapacity(e.target.value)} className="form-control">
                                            <option value={vehicleCapacity} defaultValue={true}>{vehicleCapacity}</option>
                                            {
                                                vehicleCapacityList?.length ? vehicleCapacityList.map(item => {
                                                        return (
                                                            <option value={item} key={item}>{item}</option>
                                                        ) 
                                                    }) : null
                                            }
                                        </select>
                                    </div>
                                    <div className="col col-md-6">
                                        <label htmlFor="registrationNumber-input" className=" form-control-label">Registration Number</label>
                                        <input type="text" id="registrationNumber-input" name="registrationNumber-input" ref={rNumber} placeholder={registrationNumber} className="form-control" />

                                    </div>
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
