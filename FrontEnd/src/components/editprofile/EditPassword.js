import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditPassword = ({ stateUserId }) => {
    //INITIALISING STATE VARIABLES
    let [password, setPassword] = useState('');
    let [repassword, setRepassword] = useState('');

    //INITIALISING REFERENCES
    let formPassword = useRef();
    let formRepassword = useRef();

    //FUNCTION CALLED ONLCICK TO CHANGE STATE VARIABLES AND TO VALIDATE
    const updateSendThisData = () => {
        if (formPassword.current.value !== "")
            setPassword(formPassword.current.value);
        if (formRepassword.current.value !== "")
            setRepassword(formRepassword.current.value);
    }

    // FUNCTION TO SEND UPDATED PASSWORD
    const updateUserPassword = (e) => {
        e.preventDefault();
        let sendThis = {
            password: password,
            userId: stateUserId,
        };
        console.log(sendThis);
        if (password === repassword && password !== '') {
            // console.log("done");
            axios.put("http://localhost:8080/users", sendThis).then(res => {
                // console.log(res.data)
                formPassword.current.value = null;
                formRepassword.current.value = null;
            }).catch(err => {
                console.log(err);
            })
            toast.success("Password Successfully Updated !")
        }
        else {
            formPassword.current.value = null;
            formRepassword.current.value = null;
            toast.error("Password Does Not Match !")
        }
    }
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <strong>Change Password</strong>
                </div>
                <div className="card-body p-5">
                    <form onSubmit={updateUserPassword} className="form-horizontal">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <label htmlFor="password-input" className=" form-control-label">Password</label>
                                <input type="password" id="password-input" name="password-input" ref={formPassword} placeholder="Password" className="form-control" required />
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="repassword-input" className=" form-control-label">Re-Enter Password</label>
                                <input type="password" id="repassword-input" name="password-input" ref={formRepassword} placeholder="Password" className="form-control" required />
                            </div>
                            <div className="col-12 col-md-4">
                                <div className='text-center pt-5'>
                                    <button type="submit" className="btn btn-primary" onClick={updateSendThisData}>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
