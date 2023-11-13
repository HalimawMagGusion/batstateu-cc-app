
import React from "react";
import Footer from "../../components/Footer";

const VerificationSent = () => {

  const style = { color: "white", fontSize: "1.5em" }
  return (
    <div className="page-container">
    <div className="content-wrap">
    <div>
    <div className="text-center mt-5">
      <img  src="/Images/BatStateUCClogo.png" alt="BatStateU CC Logo"               
              width="150"
              height="auto"
               />
    </div>  
    <div className="shadow rounded p-4 mt-5 text-center form">
      <h3>Email Verification Sent</h3>
      <br/>
      <p>
        An email verification link has been sent to your email address. Please
        check your inbox and follow the link to complete the registration
        process.
      </p>
      
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div>

    </div>
    <Footer/>
    </div>
  );
};

export default VerificationSent;


