
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaSquareFacebook} from "react-icons/fa6";
import { AiFillInstagram} from "react-icons/ai";
import { Link } from "react-router-dom";


const Footer = () => {


    const styleFooter = { color: 'white' }; 
    const style = { color: "white", fontSize: "1.5em" }

    return(
        <footer className="bg-danger mt-5">
          <h5 className="text-center pt-4 text-light ">Contact Us</h5>
            <div className="socials mt-2" style={{ display: 'flex', justifyContent: 'center' }}>             
              <ul className="list-unstyled">
              
                <li className="me-3">
                  <a href="mailto:batstateucampusclassifieds@gmail.com" style={style}>
                    <MdEmail size={40} style={style} />
                  </a>
                </li>
                <li className="me-3">
                  <a href="https://www.facebook.com/groups/1433847356979674" target="_blank" style={style}>
                    <FaSquareFacebook size={34} style={style} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/batstateucc/" target="_blank" style={style}>
                    <AiFillInstagram size={40} style={style} />
                  </a>
                </li>
              </ul>
            </div>
  
        <div className="mt-2">
          <div className="text-center text-light">

            <p>
              <a href="https://www.facebook.com/groups/1433847356979674" target="_blank" style={styleFooter}>BatStateU Tambayan</a> &nbsp;|&nbsp; Email:{' '}
              <a href="mailto:batstateucampusclassifieds@gmail.com" style={styleFooter}>
              batstateucampusclassifieds@gmail.com
              </a>
              <br/>
              

              <Link to="/terms-and-conditions" style={styleFooter}>
                Terms and Conditions
              </Link>
            
            </p>

            <p>BatStateU Campus Classifieds 2023 </p>
          </div>
        </div>
      </footer>
    )
    }

export default Footer;