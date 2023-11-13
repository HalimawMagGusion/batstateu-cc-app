import React from 'react';
import { Container, Row, Col, Image, Card} from 'react-bootstrap';
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill } from "react-icons/pi";
import CarouselHeader from "../components/CarouselHeader";
import Footer from "../components/Footer";


const cardStyle = {
  height: '280px', // Adjust the height as needed
  marginBottom: '30px',
  overflow: 'auto'
}


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};


const About = () => {
  return (
    <div className="page-container">
    <div className="content-wrap">
    <div>
    <Container className="mt-5">
      <CarouselHeader/>

      <div className='mb-5'>
      <Row className="mt-5 mb-5 text-center">
        <Col md={4}>
        <Card style={cardStyle} className='border-0'>
        <div style={containerStyle}>
        <PiNumberCircleOneFill
                    size={80}
                    className="text-danger mt-3"
                    alt="1"
                  />
        </div>
            <Card.Body>
              <Card.Title>Ad Listing</Card.Title>
              <Card.Text>
              The process of creating, uploading, and managing your item's advertisement on the platform. Users can include pictures and details, mark items as sold, or remove ads when necessary.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
        <Card style={cardStyle} className='border-0'>
        <div style={containerStyle}>
        <PiNumberCircleTwoFill
                    size={80}
                    className="text-danger mt-3"
                    alt="2"
                  />
        </div>
            <Card.Body>
              <Card.Title>Browse Ads</Card.Title>
              <Card.Text>
              Involves exploring the platform's listings, utilizing filters and sorting options to find specific items, and saving preferred listings as favorites for future reference.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
        <Card style={cardStyle} className='border-0'>
        <div style={containerStyle}>
        <PiNumberCircleThreeFill
                    size={80}
                    className="text-danger mt-3"
                    alt="3"
                  />
        </div>
            <Card.Body>
              <Card.Title>Contact Seller</Card.Title>
              <Card.Text>
              Contacting the Seller entails accessing the seller's contact information within an ad to initiate communication regarding a listed item.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>

      <hr className='mb-5'/>
      
      <br/>
      <Row className="mb-5">
        <Col className="d-flex align-items-center">
          <div className="p-5 text-left text-dark">
            <h1>Welcome to BatStateU Campus Classifieds</h1>
            <p>Your virtual marketplace for the Batangas State University community. We're here to connect students, making it easy to buy, sell, and trade educational items.</p>
          </div>
        </Col>
        <Col className="text-center">
          <Image src="/Images/BatStateUCClogo.png" alt="BatStateU Logo" width={400} height={400} />
        </Col>
      </Row>

      <hr className='mb-5'/>
            
            <br/>
      <Row className="mb-5">
        <Col className="text-center">
          <Image src="/Images/AboutLogo1.png" alt="Piggy Bank" width={400} height={400} />
        </Col>
        <Col className="d-flex align-items-center">
          <div className="p-5 text-left text-dark">
            <h1>Our Purpose is to Alleviate the Financial Strain on Students</h1>
            <p>By providing an affordable avenue for accessing essential education resources, we aim to promote sustainability by reducing waste and encouraging eco-friendly consumption practices among students. </p>
          </div>
        </Col>

      </Row>

      <hr className='mb-5'/>
            
            <br/>
      <Row className="mb-5">
        <Col className="d-flex align-items-center">
          <div className="p-5 text-left text-dark">
            <h1>Collaboration with BatStateU Tambayan</h1>
            <p>The collaboration between 3rd Year BSIT students of Batangas State University and the BSU Tambayan Group is driven by a shared goal to assist fellow students financially. Recognizing the need for an online platform to help students save money, the BSIT students took the initiative to create the 'BatStateU Campus Classifieds' website.</p>
          </div>
        </Col>
        <Col className="text-center">
          <Image src="/Images/AboutLogo2.png" alt="Collaboration" width={400} height={400} />
        </Col>
      </Row>
      <br/>

   </Container>


   </div>
   </div>

   <Footer />
   </div>
  );
};

export default About;
