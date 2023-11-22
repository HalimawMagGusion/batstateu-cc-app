import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";
import { sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import Footer from "../../components/Footer";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      // Check if the email exists in the authentication system
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods && signInMethods.length > 0) {
        // Email exists, send email verification
        await sendEmailVerification(auth.currentUser);
        setSuccess(true);
        setEmail("");
      } else {
        // Email does not exist, display an error
        setError("Email not found in the authentication system");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="text-center mt-5">
          <img
            src="/Images/BatStateUCClogo.png"
            alt="BatStateU CC Logo"
            width="150"
            height="auto"
          />
        </div>
        <form className="shadow rounded p-4 mt-5 form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Resend Email Verification</h3>
          {success ? (
            <p className="text-center mt-5">
              An e-mail is sent containing verification instructions
            </p>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error ? (
                <p className="text-center text-danger">{error}</p>
              ) : null}
              <div className="text-center mb-3">
                <button className="btn btn-secondary btn-sm">Send</button>
              </div>
            </>
          )}
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default ResendVerification;
