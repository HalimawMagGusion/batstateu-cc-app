import React, { useState, useEffect } from "react";
import { collection, orderBy, query, getDocs, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import AdCard from "../components/AdCard";
import CarouselHeader from "../components/CarouselHeader";
import Footer from "../components/Footer";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const getAds = async () => {
    const adsRef = collection(db, "ads");
    let q;
    if (filter !== "" && sort !== "") {
      q = query(adsRef, orderBy("publishedAt", "desc"));
    } else if (filter !== "") {
      q = query(
        adsRef,
        where("category", "==", filter),
        orderBy("publishedAt", "desc")
      );
    } else if (sort === "high") {
      q = query(adsRef, orderBy("price", "desc"));
    } else {
      q = query(adsRef, orderBy("price", "asc"));
    }
    const adDocs = await getDocs(q);
    let ads = [];
    adDocs.forEach((doc) => ads.push({ ...doc.data(), id: doc.id }));
    setAds(ads);
  };

  useEffect(() => {
    getAds();
  }, [filter, sort]);

  return (
    <div className="page-container">
    <div className="content-wrap">
    <div className="mt-5 container">
      <CarouselHeader/>
      <div className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap mb-5 mt-5 form">
        <div>
          <h6>Filter By Category</h6>
          <select
            className="form-select"
            style={{ width: "200px", margin:"auto"}}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="School Supplies">School Supplies</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
            <option value="Services">Services</option>
            <option value="Lost and Found">Lost and Found</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div>
          <h6>Sort By</h6>
          <select
            className="form-select "
            style={{ width: "200px", margin: "auto" }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Latest</option>
            <option value="high">Price High</option>
            <option value="low">Price Low</option>
          </select>
        </div>
      </div>
      <h3 className="mb-2">Recent Listings</h3>
      <hr className="mb-4"></hr>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-sm-6 col-md-4 col-xl-3 mb-5" key={ad.id}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
    </div>
    <br/><br/><br/><br/>

    </div>
    <Footer/>
    </div>
  );
};

export default Home;
