import React from 'react'
import { SortedRequestsItem } from './SortedRequestsItem';

export const SortedRequests = (props) => {

    return (
        <>

            <div className="au-message-list-title">
                <div className='row'>
                    <div className='col-md-3'>
                        Start Location : {props.data.start[0].cityName}
                    </div>
                    <div className='col-md-3'>
                        End Location : {props.data.end[0].cityName}
                    </div>
                    <div className='col-md-3'>
                        Date : {props.data.date}
                    </div>
                    <div className='col-md-3'>
                        Time : {props.data.time}
                    </div>
                </div>
            </div>
            {
                props.data.query.length !== 0 ?
                    props.data.query.map(ele => {
                        return (
                            <SortedRequestsItem key={ele._id} data={ele} />
                        )
                    }) : <div className='NoRequests'>No Requests</div>
            }

        </>
    )
}
