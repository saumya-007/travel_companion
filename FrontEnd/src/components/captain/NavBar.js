import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NavBar = () => {
    let navigate = useNavigate();
    const logOut = () => {
        toast.info("Logging Out !")
        setTimeout(() => {
            localStorage.clear();
            navigate("/");
        }, 2000);

    }
    return (
        <aside className="menu-sidebar">
            <div className="logo">
                <i className="fas fa-car fa-lg mr-3"></i> TRAVEL BUDDY
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        <li>
                            <Link to="/captaindashboard/homecontent">
                                <i className="fas fa-home"></i>Getting Started</Link>
                        </li>
                        <li>
                            <Link to="/captaindashboard/editprofile">
                                <i className="far fa-edit"></i>Edit Profile</Link>
                        </li>
                        <li>
                            <Link to="/captaindashboard/addeditvehicle">
                                <i className="fas fa-plus"></i>Add / Edit Vehicles</Link>
                        </li>
                        <li>
                            <Link to="/captaindashboard/rides">
                                <i className="fas fa-car"></i>Rides</Link>
                        </li>
                        <li>
                            <Link to="/captaindashboard/requests">
                                <i className="fas fa-paper-plane"></i>Requests</Link>
                        </li>
                        <li>
                            <Link to="/captaindashboard/chats">
                                <i className="fa fa-comment-alt"></i>Chats</Link>
                        </li>
                        <li>
                            <button onClick={logOut} className="logout-btn mt-2"><i className="fas fa-power-off margin-logout"></i>Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                style={{ marginTop: "80px" }}
            />
        </aside>
    )
}
