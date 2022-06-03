import React, { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Signup } from './Signup'

import { CaptainDashBoard } from './captain/CaptainDashBoard'
import { HomeContent } from '../components/captain/HomeContent'
import { EditProfile } from './editprofile/EditProfile'
import { EditVehicle } from './captain/addeditvehicle/EditVehicle'
import { Rides } from './captain/rides/Rides'
import { Requests } from './captain/rides/Requests'
import { ChatApplication } from './chat/ChatApplication'

import { PatronDashBoard } from './patron/PatronDashBoard'
import { TripsSearch } from './patron/rides/TripsSearch'
import { PatronHomeContent } from './patron/PatronHomeContent'

import { CountryState } from './CountryState'

export const ClientRouting = () => {
    return (
        <>
            <Routes>
                {/* login */}
                <Route path="/" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>

                {/* captain */}
                <Route path="captaindashboard" element={<CaptainDashBoard />}>
                    <Route path="homecontent" element={<HomeContent />}></Route>
                    <Route path="editprofile" element={<EditProfile />}></Route>
                    <Route path="addeditvehicle" element={<EditVehicle />}></Route>
                    <Route path="rides" element={<Rides />}></Route>
                    <Route path="requests" element={<Requests />}></Route>
                    <Route path="chats" element={<ChatApplication />}></Route>
                </Route>

                {/* patron */}
                <Route path="patrondashboard" element={<PatronDashBoard />}>
                    <Route path="homecontent" element={<PatronHomeContent />}></Route>
                    <Route path="tripsearch" element={<TripsSearch />}></Route>
                    <Route path="editprofile" element={<EditProfile />}></Route>
                    <Route path="chats" element={<ChatApplication />}></Route>
                </Route>

                <Route path="maps/:startLat/:startLon/:endLat/:endLon" element={<CountryState />}></Route>

            </Routes>
        </>
    )
}
