import React, { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut} from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";


const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
  });
  
  const navigate = useNavigate();
  const { name, email, password, confirmPassword, error, loading } = values;

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setValues({ ...values, error: "All fields are required" });
      return;
    }
    if (password !== confirmPassword) {
      setValues({ ...values, error: "Password must match" });
      return;
    }

    const combinedEmail = email + "@g.batstate-u.edu.ph";

    setValues({ ...values, error: "", loading: true });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        combinedEmail,
        password
      );

      await sendEmailVerification(result.user);

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email: combinedEmail,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
      });

      await signOut(auth);

      setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        loading: false,
      });

      navigate("/verification-sent", {replace: true});
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };

  return (
    <div className="page-container ">
    <div className="content-wrap mb-5 ">
    <div className="text-center mt-5 ">
      <img  src="/Images/BatStateUCClogo.png" alt="BatStateU CC Logo"               
              width="150"
              height="auto"
               />
    </div>
    <form className="shadow rounded p-4 mt-5 form" onSubmit={handleSubmit}>
      <h3 className="text-center mb-5 mt-3">Create An Account</h3>
      <div className="mb-3">

        <label htmlFor="name" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          minLength={4}
          value={name}
          onChange={handleChange}
          required
        />
      </div>


      <div className="mb-3">
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
        required  />
        <span className="input-group-addon" id="basic-addon">&nbsp;@g.batstate-u.edu.ph</span>
      </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          minLength={8}
          onChange={handleChange}
          required
        />       
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      <div>

    <div className="text-center">
		<input required type="checkbox" name="Terms" className="m-2" />
    <label htmlFor="Terms" className="form-label mt-4">
			I agree to the <Link to="/terms-and-conditions" className="text-danger">Terms and Conditions</Link>
		</label>
		</div>

      </div>
      </div>
      {error ? <p className="text-center text-danger">{error}</p> : null}
      <div className="text-center mb-3">
        <button className="btn btn-secondary btn-sm" disabled={loading}>
          Register
        </button>
      </div>

    </form>
    
    </div>
    <Footer/>
    </div>
  );
};

export default Register;