import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    let navigate = useNavigate()
    let [role, setRole] = useState()
    let emailForm = useRef()
    let passwordForm = useRef()
    let Form = useRef()

    const toSignUp = () => {
        navigate('/signup', { replace: true })
    }

    const logInFu = async (e) => {
        e.preventDefault()
        let sendThis = {
            email: emailForm.current.value,
            password: passwordForm.current.value,
            role: role,
        }
        await axios.post("http://localhost:8080/login", sendThis).then(res => {
            // console.log(res.data)
            if (res.data.status === 200) {
                let userdata = decodeToken(res.data.data)
                console.log(userdata)
                localStorage.setItem('token', res.data)
                localStorage.setItem('userId', userdata.user)
                localStorage.setItem('userName', userdata.name)
                localStorage.setItem('profilephoto', userdata.profilephoto)
                toast.success("Logged In Successfully !")
                setTimeout(() => {
                    userdata.roleName == 'patron' ?
                        navigate('/patrondashboard/homecontent', { replace: true }) :
                        navigate('/captaindashboard/homecontent', { replace: true })
                }, 2000);

            } else {
                toast.error("Please Check your Credentials !")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="container">
                <div className="login-wrap">
                    <div className="login-content">
                        <div className="login-form">
                            {/* <form onSubmit={addUser} ref={Form}> */}
                            <form ref={Form}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input className="au-input au-input--full" type="email" name="email" placeholder="Email" required ref={emailForm} />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select name="select" id="select" className="form-control" onChange={(e) => { setRole(e.target.value) }}>
                                        <option value="default" defaultValue={true}>Please Select Role</option>
                                        <option value="captain">Captain</option>
                                        <option value="patron">Patron</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input className="au-input au-input--full" type="password" name="password" placeholder="Password" required ref={passwordForm} />
                                </div>
                                <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit" onClick={logInFu}>Log in</button>
                            </form>
                            <div className="register-link">
                                <p>
                                    Already have account?
                                    <button onClick={toSignUp} className="btn btn-link">Sign Up</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                style={{ marginTop: "80px" }}
            />
        </>
    )
}
