import React from 'react'
import { NavBar } from './NavBar'
import { NavTop } from './NavTop'
import { Outlet } from 'react-router-dom'

export const CaptainDashBoard = () => {
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
