import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";
import AdCard from "../components/AdCard";
import Footer from "../components/Footer";

const MyFavorites = () => {
  const [ads, setAds] = useState([]);

  const getAds = async () => {
    // get ads from fav collection where users includes logged in user
    const favRef = collection(db, "favorites");
    const q = query(
      favRef,
      where("users", "array-contains", auth.currentUser.uid)
    );
    const docsSnap = await getDocs(q);

    let promises = [];
    docsSnap.forEach(async (doc) => {
      const adsRef = collection(db, "ads");
      const q = query(adsRef, where(documentId(), "==", doc.id));
      promises.push(getDocs(q));
    });
    let ads = [];
    const docs = await Promise.all(promises);
    docs.forEach((querySnap) =>
      querySnap.forEach((dSnap) => ads.push({ ...dSnap.data(), id: dSnap.id }))
    );
    setAds(ads);
  };

  useEffect(() => {
    getAds();
  }, []);
  
  return (
    <div className="page-container">
    <div className="content-wrap">
    <div className="mt-5 container">
      {ads.length ? <h3>Favorite Ads</h3> : <h3>No Favorite Ads</h3>} <br/>
      <div className="row">
        {ads.map((ad) => (
          <div key={ad.id} className="col-sm-6 col-md-3 mb-3 ">
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
      <br/><br/><br/><br/><br/>
    </div>

    </div>
    <Footer/>
    </div>
  );
};

export default MyFavorites;
