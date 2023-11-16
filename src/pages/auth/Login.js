import React, { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import {Button, InputGroup} from 'react-bootstrap';


const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
        case "auth/user-not-found":
            return "User not found. Please check your email.";
        case "auth/wrong-password":
            return "Invalid password. Please try again.";
        case "auth/too-many-requests":
            return "Too many unsuccessful login attempts. Please try again later.";
        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";
        // Add more cases as needed for specific error handling
        default:
            return "Invalid SR-Code or password. Please ty again.";
    }
};

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { email, password, error, loading } = values;

    const handleChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setValues({ ...values, error: "All fields are required" });
            return;
        }

        const combinedEmail = email + "@g.batstate-u.edu.ph";

        setValues({ ...values, error: "", loading: true });

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                combinedEmail,
                password
            );

            if (result.user.emailVerified) {
                // User's email is verified, proceed with login
                await updateDoc(doc(db, "users", result.user.uid), {
                    isOnline: true,
                });

                setValues({
                    email: "",
                    password: "",
                    error: "",
                    loading: false,
                });

                const user = await getDoc(doc(db, "users", result.user.uid));

                if (user.data().isBanned) {
                    // User's account is banned, show an error message
                    setValues({
                        ...values,
                        error: "Your account has been banned. Please contact the administrator for more details.",
                        loading: false,
                    });

                    await signOut(auth);

                    return;
                }

                navigate("/", { replace: true });
            } else {
                // User's email is not verified, show an error message
                setValues({
                    ...values,
                    error: "Please verify your email before logging in.",
                    loading: false,
                });

                await signOut(auth);
            }
        } catch (error) {
        const errorMessage = handleFirebaseError(error.code);
        setValues({ ...values, error: errorMessage, loading: false });
    }
    };

    return (
        <div className="page-container">
        <div className="formContainer content-wrap">
            <div className="text-center mt-5">
                <img
                    src="/Images/BatStateUCClogo.png"
                    alt="BatStateU CC Logo"
                    width="150"
                    height="auto"
                />
            </div>
            <form
                className="shadow rounded p-4 mt-5 form"
                onSubmit={handleSubmit}
            >
                <h3 className="text-center mb-5 mt-3">Log Into Your Account</h3>

                <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="SR-Code"
                            value={email}
                            onChange={handleChange}
                        />
                        <span className="input-group-addon" id="basic-addon">
                            &nbsp;@g.batstate-u.edu.ph
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                <InputGroup>
                    <input
                        type={showPassword ? "text": "password"}
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange}   
                        
                    />
                     <Button className="bg-secondary border-0"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                </InputGroup>
                   
                </div>

                {error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : null}
                <div className="text-center mb-3">
                    <button
                        className="btn btn-secondary btn-sm"
                        disabled={loading}
                    >
                        Login
                    </button>
                </div>
                <div className="text-center mb-3">
                    <small>
                        <Link className="text-danger"
                            to="/auth/forgot-password"
                        
                        >
                            Forgot Password?
                        </Link>
                    </small>
                </div>
            </form>
            <br />
            <br />
            <br />
=
            

        </div>
        <Footer/>
        </div>
    );
};

export default Login;
