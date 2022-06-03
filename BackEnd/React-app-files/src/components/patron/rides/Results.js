import React from 'react'
import { ResultsList } from './ResultsList'

export const Results = (props) => {
    let count = 0;
    return (
        <>
            {
                props.trips.length === 0 ? <div className='text-center'>No Scheduled Trips</div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start City</th>
                                <th>End City</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>vehicle</th>
                                <th>Fair</th>
                                <th>Status</th>
                                <th>Request</th>
                                <th>Chats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.trips !== undefined ?
                                    props.trips.map(ele => {
                                        count++
                                        return (<ResultsList key={ele._id} trips={ele} />)
                                    }) :
                                    null
                            }
                        </tbody>
                    </table>

            }
        </>
    )
}
