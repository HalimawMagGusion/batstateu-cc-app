import React from "react";
import {useEffect, useState} from "react";
import {HiOutlineArrowCircleUp} from "react-icons/hi"

function ScrollToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 500) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }

    })

  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

    return (
      <div>

      {backToTopButton && (
        <button className='border-0 bg-transparent'
        style={{
          position: "fixed",
          bottom: "80px",
          right: "30px",
          borderRadius: "50%"

 
        }} onClick={scrollUp}><HiOutlineArrowCircleUp size={50} className="text-danger hover-item bg-white" style={{borderRadius: "50%"}} /></button>
      )}



      </div>
    );
}

export default ScrollToTopButton;
