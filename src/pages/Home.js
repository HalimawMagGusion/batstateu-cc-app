import React, { useState, useEffect } from "react";
import { collection, orderBy, query, getDocs, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import AdCard from "../components/AdCard";
import CarouselHeader from "../components/CarouselHeader";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import {FiPlusSquare} from "react-icons/fi"
import Bgpng from "../Images/QuoteBackground.png"

const Home = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const locations = ["Pablo Borbon", "Alangilan", "Lipa", "Nasugbu", "Malvar", "Lemery", "Balayan", "Lobo", "Rosario", "San Juan"]

  const getAds = async () => {
    const adsRef = collection(db, "ads");
    let q = adsRef;
  
    if (filter && locationFilter) {
      // Both category and location filters are set
      q = query(
        q,
        where("category", "==", filter),
        where("location", "==", locationFilter),
        ...applySorting(sort)
      );
    } else if (filter) {
      // Only category filter is set
      q = query(q, where("category", "==", filter), ...applySorting(sort));
    } else if (locationFilter) {
      // Only location filter is set
      q = query(q, where("location", "==", locationFilter), ...applySorting(sort));
    } else {
      // No filters are set
      q = query(q, ...applySorting(sort));
    }
  
  
  
    const adDocs = await getDocs(q);
    let ads = [];
    adDocs.forEach((doc) => ads.push({ ...doc.data(), id: doc.id }));
    setAds(ads);
  };

  const applySorting = (sort) => {
    switch (sort) {
      case "latest":
        return [orderBy("publishedAt", "desc")];
      case "oldest":
        return [orderBy("publishedAt", "asc")];
      case "high":
        return [orderBy("price", "desc")];
      case "low":
        return [orderBy("price", "asc")];
      default:
        return [];
    }
  };

  useEffect(() => {
    getAds();
  }, [filter, locationFilter, sort]);

  const containerStyle = {
    position: 'relative',
    padding: '20px', // Add any other styles you need
    borderRadius: '15px',
    backgroundImage: `url(${Bgpng})`, // Add this line
    alt: 'Background Images',
    backgroundSize: 'cover', // Add this line to adjust the background size
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center', // Center the background image

  };

  const gradientStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(220,53,69,1) 30%, rgba(239,167,174,1) 100%)',
    borderRadius: '15px',
    opacity: 1,
    zIndex: -1,
  };


  


  return (
    <div className="page-container">
    <div className="content-wrap">
    <div className="mt-5 container">
      <CarouselHeader/>

      <div className="container text-center mt-4 p-4 shadow-lg" style={containerStyle}>
      <div style={gradientStyle}></div> 
     
      <div className="d-flex flex-column align-items-center">
        
        <h3 className="text-light pt-3 pb-1"><span className="text-shadow">Your Gateway to Campus Bargains!</span><Link to={`place-an-ad`} className="btn mt-2 mb-3 m-3 btn-quote"><FiPlusSquare size={15}/><span></span> Place an Ad</Link> </h3>
        
       

      </div>
    </div>



    <div className="d-flex justify-content-center align-items-center mb-5 mt-5 form">
  {/* Filter By Location */}
  <div className="mx-3" style={{ width: "200px" }}>
    <h6 className="pointer">Filter By Campus</h6>
    <select
      className="form-select"
      style={{ width: "100%" }}
      onChange={(e) => setLocationFilter(e.target.value)}
    >
      <option value="">All</option>
      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  </div>

  {/* Filter By Category */}
  <div className="mx-3" style={{ width: "200px" }}>
    <h6 className="pointer">Filter By Category</h6>
    <select
      className="form-select"
      style={{ width: "100%" }}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="School Supplies">School Supplies</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Furniture">Furniture</option>
      <option value="Services">Services</option>
      <option value="Rentals">Rentals</option>
      <option value="In Search For">In Search For</option>
      <option value="Lost and Found">Lost and Found</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>
  </div>

  {/* Sort By */}
  <div className="mx-3" style={{ width: "200px" }}>
    <h6 className="pointer">Sort By &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
    <select
      className="form-select"
      style={{ width: "100%" }}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="latest">Latest-Oldest</option>
      <option value="oldest">Oldest-Latest</option>
      <option value="high">Highest-Lowest Price</option>
      <option value="low">Lowest-Highest Price</option>
    </select>
  </div>
</div>
      <div className="card shadow-lg border-0">
        <div className="p-5">
      <h3 className="mb-2">Posted Listings</h3>
      <hr className="mb-4"></hr>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-sm-6 col-md-4 col-xl-3 mb-5" key={ad.id}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    <br/><br/><br/><br/>

    </div>
    <Footer/>
    </div>
  );
};

export default Home;
