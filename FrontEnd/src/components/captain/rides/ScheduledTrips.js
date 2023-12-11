import React from 'react'
import { ScheduledTripsDetails } from './ScheduledTripsDetails'

export const ScheduledTrips = (props) => {
    let trips = props.trips
    return (
        <>
            <table className="table p-5">
                <thead className="thead-dark text-center">
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Vehicle</th>
                        <th>fair</th>
                        <th>Remove</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        trips !== undefined ? (
                            trips.map(ele => {
                                return (<ScheduledTripsDetails data={ele} key={ele._id} setDeleted={props.setDeleted} />)

                            })
                        ) : (
                            null
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
