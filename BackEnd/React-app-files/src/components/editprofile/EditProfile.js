import React, { useState } from 'react'
import { EditUserDetails } from './EditUserDetails'
import { EditPassword } from './EditPassword'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditProfile = () => {
    let [stateUserId, setStateUserId] = useState();
    //MAKING STATE VARIABLE TO PASS DATA TO SIBLING COMPONENT
    return (
        <>
            <div>
                <EditUserDetails setStateUserId={setStateUserId} />
            </div>
            <div>
                <EditPassword stateUserId={stateUserId} />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                style={{ marginTop: "80px" }}
            />
        </>
    )
}
