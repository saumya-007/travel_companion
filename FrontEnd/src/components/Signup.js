import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {

    let navigate = useNavigate()

    let [gender, setGender] = useState()
    let [role, setRole] = useState()
    let [fileName, setFileName] = useState()

    let usernameForm = useRef()
    let emailForm = useRef()
    let numberForm = useRef()
    let passwordForm = useRef()
    let repasswordForm = useRef()
    let Form = useRef()

    const onChangeFile = e => {
        setFileName(e.target.files[0])
    }

    const toLogIn = () => {
        navigate('/')
    }

    const errorCheck = () => {
        if (passwordForm.current.value !== repasswordForm.current.value) {
            toast.error("Password Missmatch !")
        }
        if (passwordForm.current.value.length < 4) {
            toast.error("Password too Short !")
        }
        if (gender === undefined) {
            toast.error("Gender Not Selected !")
        }
        if (role === "default") {
            toast.error("Role Not Selected !")
        }
        if (numberForm.current.value.length !== 10) {
            toast.error("Invalid Mobile Number !")
        }
    }

    const addUser = async (e) => {
        e.preventDefault()

        let formData = new FormData()

        formData.append("name", usernameForm.current.value)
        formData.append("email", emailForm.current.value)
        formData.append("phoneNumber", "+91" + numberForm.current.value)
        formData.append("password", passwordForm.current.value)
        formData.append("role", role)
        formData.append("gender", gender)
        if (fileName !== undefined) {
            formData.append("profilephoto", fileName)
            if (passwordForm.current.value === repasswordForm.current.value && repasswordForm.current.value.length > 3 && gender !== undefined && numberForm.current.value.length === 10 && role !== "default") {
                await axios.post("http://localhost:8080/users", formData).then(res => {
                    console.log(formData)
                    if (res.data.status === -1) {
                        toast.error("User Already Exist !")
                    }
                    else {
                        toast.success("User Added Succesfully !")
                        setTimeout(() => {
                            Form.current.reset()
                            navigate('/')
                        }, 2000);
                    }

                }).catch(err => {
                    console.log(err)
                })
            }
            else {
                errorCheck()
            }
        }
        else
            toast.error("Please add a profile photo")
    }

    return (
        <>
            <div className="container">
                <div className="login-wrap">
                    <div className="login-content">
                        <div className="login-form">
                            <form onSubmit={addUser} ref={Form} encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input className="au-input au-input--full" type="text" name="username" placeholder="Username" required ref={usernameForm} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input className="au-input au-input--full" type="email" name="email" placeholder="Email" required ref={emailForm} />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input className="col-md-2 au-input au-input--full" type="text" name="number" placeholder="+ 91" disabled={true} required />
                                    <input className="col-md-10 au-input au-input--full" type="text" name="number" placeholder="Number" required ref={numberForm} />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="form-check">
                                        <div className="radio">
                                            <label className="form-check-label ">
                                                <input type="radio" id="radio1" name="radios" value="male" className="form-check-input" onChange={(e) => { setGender(e.target.value) }} />Male
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="form-check-label ">
                                                <input type="radio" id="radio2" name="radios" value="female" className="form-check-input" onChange={(e) => { setGender(e.target.value) }} />Female
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="form-check-label ">
                                                <input type="radio" id="radio3" name="radios" value="others" className="form-check-input" onChange={(e) => { setGender(e.target.value) }} />Others
                                            </label>
                                        </div>
                                    </div>
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
                                <div className="form-group">
                                    <label>Reenter Password</label>
                                    <input className="au-input au-input--full" type="password" name="password" placeholder="Re Enter Password" required ref={repasswordForm} />
                                </div>
                                <div className="form-group">
                                    <label>Profile Photo</label>
                                    <input type="file" accept="image/*" onChange={onChangeFile} filename="profilephoto" name="profilephoto" />
                                </div>
                                <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">Register</button>
                            </form>
                            <div className="register-link">
                                <p>
                                    Already have account?
                                    <button onClick={toLogIn} className="btn btn-link">Login</button>
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
