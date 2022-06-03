import React from 'react'
import { useNavigate } from 'react-router-dom';

export const PatronHomeContent = () => {
    let navigate = useNavigate()
    const handleClick = () => {
        navigate('/patrondashboard/tripsearch', { replace: true })
    }
    return (
        <>
            <div class="row-home-top">
                3 Easy Steps
            </div>
            <div class="row-home">
                <div class="column-home">
                    <div class="card-home">
                        <h3><div className='steps-circle mb-3'>1</div></h3>
                        <h3>Search For Trips Between Locations</h3>
                        <p>Enter Start Location and End Location To Search For Trips</p>
                    </div>
                </div>
                <i className='fa fa-arrow-circle-right size'></i>
                <div class="column-home">
                    <div class="card-home">
                        <h3><div className='steps-circle mb-3'>2</div></h3>
                        <h3>Request For A Ride To Multiple People</h3>
                        <p>You Can Request People For A Ride To The Captain</p>
                    </div>
                </div>
                <i className='fa fa-arrow-circle-right size'></i>
                <div class="column-home">
                    <div class="card-home">
                        <h3><div className='steps-circle mb-3'>3</div></h3>
                        <h3>Connect And Ride Along</h3>
                        <p>Start A Converation and Ride Along With Captain</p>
                    </div>
                </div>
            </div>
            <div class="row-home-bottom">
                <input type="button" className='btn btn-info btn-lg' value="Search Trip" onClick={handleClick} />
            </div>
        </>
    )
}
