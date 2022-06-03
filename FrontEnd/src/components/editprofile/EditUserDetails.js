import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditUserDetails = ({ setStateUserId }) => {
    //INITIALISING STATE VARIABLES
    let [userId, setUserId] = useState('');
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [number, setNumber] = useState('');
    let [gender, setGender] = useState('');
    let [displayNumber, setDisplayNumber] = useState();

    //INITIALISING REFERENCES
    let formName = useRef();
    let formEmail = useRef();
    let formNumber = useRef();

    //FEATCHING USERINFO AND SETTING IT TO STATE VARIABLES
    const getData = () => {
        axios.get("http://localhost:8080/users/" + localStorage.getItem('userId')).then(res => {
            setUserId(res.data.data._id);
            setStateUserId(res.data.data._id);
            setName(res.data.data.firstName);
            setEmail(res.data.data.email);
            setNumber(res.data.data.phoneNumber);
            setDisplayNumber(res.data.data.phoneNumber)
            setGender(res.data.data.gender);
        }).catch(err => {
            console.log(err);
        })
    }
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    //FUNCTION CALLED ONLCICK TO CHANGE STATE VARIABLES
    const updateSendThisData = () => {
        if (formName.current.value != "")
            setName(formName.current.value);
        if (formEmail.current.value != "")
            setEmail(formEmail.current.value);
        if (formNumber.current.value != "") {
            setNumber(formNumber.current.value);
        } else {
            setNumber(number.slice(3, number.length));
        }
    }

    // FUNCTION TO SEND UPDATED INFO
    const updateUserData = async (e) => {
        e.preventDefault();
        if (gender == "default") {
            toast.error("Invalid Gender !")
        } else if (number.length !== 10) {
            console.log(number)
            toast.error("Invalid Phone Number !")
        } else {
            let sendThis = {
                name: name,
                email: email,
                phoneNumber: "+91" + number,
                gender: gender,
                userId: userId,
            };
            localStorage.setItem("userName", name)
            await axios.put("http://localhost:8080/users", sendThis).then(res => {
                console.log(res);
                toast.success("User Details Updated !")
            }).catch(err => {
                console.log(err);
            })
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <strong>Edit Profile</strong>
                </div>
                <div className="card-body p-5">
                    <form onSubmit={updateUserData} encType="multipart/form-data">
                        <div className="row form-group">
                            <div className="col col-md-1">
                                <div htmlFor="text-input" className=" form-control-label" >Name</div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className='row'>
                                    <input type="text" id="text-input" name="text-input" placeholder={name} ref={formName} className="form-control" />
                                </div>
                            </div>
                            <div className="col col-md-1">
                                <div htmlFor="email-input" className=" form-control-label" >Email</div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className='row'>
                                    <input type="email" id="email-input" name="email-input" placeholder={email} ref={formEmail} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-1">
                                <div htmlFor="contact-input" className=" form-control-label" >Contact</div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className='row'>
                                    <input className="col-md-2 form-control" type="text" placeholder="+ 91" disabled={true} required />
                                    <input className="col-md-10 form-control" type="text" id="contact" name="contact-input" placeholder={displayNumber ? displayNumber.slice(3, displayNumber.length) : null} ref={formNumber} />
                                </div>
                            </div>
                            <div className="col col-md-1">
                                <div htmlFor="select" className=" form-control-label" >Gender</div>
                            </div>
                            <div className="col-md-5">
                                <div className='row'>
                                    <select name="select" id="select" className="form-control"
                                        onChange={(e) => handleGender(e)}
                                        value={gender}
                                    >
                                        <option value="default">Select an Option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer-edit-profile mt-4">
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={updateSendThisData}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
