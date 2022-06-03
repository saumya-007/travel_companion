import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { NavTop } from './NavTop'
export const PatronDashBoard = () => {
    return (
        <>
            <div className='wrapper'>
                <div>
                    <NavBar />
                </div>
                <div className='childWrapper'>
                    <div>
                        <NavTop />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>

    )
}
