import React from 'react'
import { useNavigate } from 'react-router-dom';

export const HomeContent = () => {
    let navigate = useNavigate()
    const handleClick = () => {
        navigate('/captaindashboard/rides', { replace: true })
    }
    return (
        <>
            <div className="row-home-top">
                3 Easy Steps
            </div>
            <div className="row-home">
                <div className="column-home">
                    <div className="card-home">
                        <h3><div className='steps-circle mb-3'>1</div></h3>
                        <h3>Schedule & Post A Trip</h3>
                        <p>Select Start Location, End Location and Time of commute</p>
                    </div>
                </div>
                <i className='fa fa-arrow-circle-right size'></i>
                <div className="column-home">
                    <div className="card-home">
                        <h3><div className='steps-circle mb-3'>2</div></h3>
                        <h3>Accept Interested Parties</h3>
                        <p>You Can Accept Or Reject People's Request Of Car Pooling</p>
                    </div>
                </div>
                <i className='fa fa-arrow-circle-right size'></i>
                <div className="column-home">
                    <div className="card-home">
                        <h3><div className='steps-circle mb-3'>3</div></h3>
                        <h3>Earn Extra Cash From Trips</h3>
                        <p>Earn Extra Income By Charging People Money For Trips</p>
                    </div>
                </div>
            </div>
            <div className="row-home-bottom">
                <input type="button" className='btn btn-info btn-lg' value="Schedule Trip" onClick={handleClick} />
            </div>
        </>
    )
}
