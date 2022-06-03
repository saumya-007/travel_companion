import React from 'react'
import { UpdateVehicleTable } from './UpdateVehicleTable'

export const UpdateVehicle = ({ data, setDeleted, setUpdated }) => {
    return (
        <>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-data2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Catogery</th>
                            <th>Capacity</th>
                            <th>Registration Number</th>
                            <th>Insurance URL</th>
                            <th>Edit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(ele => {
                                return (
                                    <UpdateVehicleTable key={ele._id} data={ele} setDeleted={setDeleted} setUpdated={setUpdated} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
