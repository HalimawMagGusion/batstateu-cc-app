import React from "react";
import {Carousel} from 'react-bootstrap';

const CarouselHeader = () => {

    const gradientStyle = {
        background: 'linear-gradient(white, red)', // Adjust colors as needed
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3, // Adjust opacity as needed
      };

    const blurredImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(0.8) blur(1px)', // Adjust the blur value as needed
      };
    


    return(
    
    <div className="mt-5 shadow">
        <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Carousel style={{ height: '300px',  backgroundSize: 'cover', backgroundPosition: 'center'  }} >
        <Carousel.Item>
          <div style={blurredImageStyle}>
            <img
              className="d-block w-100"
              src="/Images/BatStateUCarouselSlide1.jpg"
              alt="BatStateU Campus"
              style={{ width: '400px', height: '300px', objectFit: 'cover', filter: 'brightness(0.8)', opacity: '0.8'}}
            />
          </div>
            <div style={gradientStyle}></div>
            <Carousel.Caption>
              <h1>Welcome to BatStateU Campus Classifieds</h1>
              <p>Buy, sell, and connect with your fellow students.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <div style={blurredImageStyle}>
          <img
              className="d-block w-100"
              src="/Images/BatStateUCarouselSlide2.png"
              alt="BatStateU Campus"
              style={{ width: '400px', height: '300px', objectFit: 'cover', filter: 'brightness(0.8)', opacity: '0.8'}}
            />
          </div>
            <div style={gradientStyle}></div>
            <Carousel.Caption>
              <h1>Find and Sell Items</h1>
              <p>Explore a wide range of items available for sale or list your own.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <div style={blurredImageStyle}>
          <img
              className="d-block w-100"
              src="/Images/BatStateUCarouselSlide3.jpg"
              alt="BatStateU Campus"
              style={{ width: '400px', height: '300px', objectFit: 'cover', filter: 'brightness(0.8)', opacity: '0.8'}}
            />
          </div>
            <div style={gradientStyle}></div>
            <Carousel.Caption>
              <h1>Connect with the Community</h1>
              <p>Engage with fellow students, build connections, and make your campus experience even more enjoyable.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
        </div>





    );
};

export default CarouselHeader;