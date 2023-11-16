import { signOut } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { auth, db } from "../FirebaseConfig";
import { useState, useEffect } from "react";
import logo from "../Images/Title1.png";
import {FiPlusSquare} from "react-icons/fi"

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [userDoc, setUserDoc] = useState(null);
    const navigate = useNavigate();

    const getUserDoc = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setUserDoc(docSnap.data());
        }
    };

    useEffect(() => {
        getUserDoc();
    }, [user]);

    const handleSignout = async () => {
        // update user doc
        await updateDoc(doc(db, "users", user.uid), {
            isOnline: false,
        });
        // logout
        await signOut(auth);
        // navigate to login
        navigate("/auth/login");
    };

    return (
        <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow" >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="BatStateU CC"
                        width="auto"
                        height="25px"
                        className="d-inline-block align-top"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user ? (
                            <>
                                <li className="nav-item mt-1">
                                    <Link className="nav-link" to={`/`}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item mt-1">
                                    <Link className="nav-link" to={`/about`}>
                                            About
                                    </Link>
                                </li>
                                <li className="nav-item mt-1">
                                    <Link
                                        className="nav-link"
                                        to={`/profile/${user.uid}`}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item mt-1">
                                    <Link
                                        className="nav-link"
                                        to={`/favorites`}
                                    >
                                        Favorites
                                    </Link>
                                </li>
                                
                                 {/* 
 
                                 <li className="nav-item">
                                    
                                <Link to={`/sell`} className="btn btn-danger shadow"><FiPlusSquare className='m-1' size={15}/>
                                Place an Ad</Link>
                                     
                                </li>
                                */} 

                                {userDoc?.isAdmin && (
                                    <>
                                        <li className="nav-item mt-1">
                                            <Link
                                                className="nav-link"
                                                to={`/admin/reports`}
                                            >
                                                Reports
                                            </Link>
                                        </li>
                                        <li className="nav-item mt-1">
                                            <Link
                                                className="nav-link"
                                                to={`/admin/users`}
                                            >
                                                Users
                                            </Link>
                                        </li>
                                    </>
                                )}

                                <button
                                    className="btn btn-danger mb-1 mt-1 m-2 border-0 shadow hover-item1"
                                ><Link className="nostyle text-light" to={`/sell`}>
                                    <FiPlusSquare className='m-1' size={15}/>Place an Ad
                                    </Link>
                                </button>
                            
                                <button
                                    className="btn btn-dark mb-1 mt-1 m-2  logout btn-1 shadow"
                                    onClick={handleSignout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>  
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/about`}>
                                            About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/auth/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
