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
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [showUserLoginNote, setShowUserLoginNote] = useState(true);
    const [showAdminLoginNote, setShowAdminLoginNote] = useState(true);
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

            // Set login status for users
        setIsUserLoggedIn(!!user);

    // Check if the user is an admin (You may need to adjust this logic based on your user data structure)
         if (userDoc && userDoc.isAdmin) {
            setIsAdminLoggedIn(true);
        }
    }, [user, userDoc]);

    const handleSignout = async () => {
        // update user doc
        await updateDoc(doc(db, "users", user.uid), {
            isOnline: false,
        });
        // logout
        await signOut(auth);

        // Reset login status for users and admins
        setIsUserLoggedIn(false);
        setIsAdminLoggedIn(false);

        // navigate to login
        navigate("/auth/login");
    };

    return (
        <div>
        <div className="row justify-content-end mx-0">
            {/* Display a notification for user login */}
            {isUserLoggedIn && showUserLoginNote && !isAdminLoggedIn && (
                <div className="alert alert-success alert-dismissible fade show col-12 rounded-0 m-0" role="alert" style={{ lineHeight: ".1" }}>
                    <div className="d-flex justify-content-between">
                        <span style={{ margin: "auto"}}>You are logged in as a user! Welcome!</span>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ fontSize: "0.6rem",
                            paddingBottom: "5px"
                        }}
                            onClick={() => setShowUserLoginNote(false)}
                        ></button>
                    </div>
                </div>
            )}

            {/* Display a notification for admin login */}
            {isAdminLoggedIn && showAdminLoginNote && (
                <div className="alert alert-success alert-dismissible fade show col-12 rounded-0 m-0" role="alert" style={{ lineHeight: ".1" }}>
                    <div className="d-flex justify-content-between">
                        <span style={{ margin: "auto"}}>You are logged in as an admin! Welcome!</span>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ fontSize: "0.6rem",
                            paddingBottom: "5px"
                        }}
                            onClick={() => setShowAdminLoginNote(false)}
                        ></button>
                    </div>
                </div>
            )}
        </div>
            
            

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
                                ><Link className="nostyle text-light text-nowrap" to={`/place-an-ad`}>
                                    <FiPlusSquare className='m-1' size={15}/>Place an Ad
                                    </Link>
                                </button>
                            
                                <button
                                    className="btn btn-dark mb-1 mt-1 m-2 logout btn-1 shadow"
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
        </div>
    );
};

export default Navbar;
