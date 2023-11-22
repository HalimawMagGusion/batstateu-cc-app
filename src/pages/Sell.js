import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { storage, db, auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const categories = ["School Supplies", "Electronics", "Fashion", "Furniture","Services","Rentals","In Search For","Lost and Found", "Miscellaneous"];
const locations = ["Pablo Borbon", "Alangilan", "Lipa", "Nasugbu", "Malvar", "Lemery", "Balayan", "Lobo", "Rosario", "San Juan"];

const Sell = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    images: [],
    title: "",
    category: "",
    price: "",
    location: "",
    contact: "",
    description: "",
    error: "",
    loading: false,
  });
  const {
    images,
    title,
    category,
    price,
    location,
    contact,
    description,
    error,
    loading,
  } = values;

  const [imageAlert, setImageAlert] = useState("");

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
  
    if (selectedImages.length > 0) {
      setValues({ ...values, images: selectedImages });
      setImageAlert("Image/s uploaded successfully!");
    } else {
      setImageAlert("Please upload at least one image");
    }
  };

  const handleCloseImageAlert = () => {
    setImageAlert("");
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValues({ ...values, error: "", loading: true });

    try {
      if (images.length === 0) {
        throw new Error("Please upload at least one image");
      }

      let imgs = [];
      // loop through images
      if (images.length) {
        for (let image of images) {
          const imgRef = ref(storage, `ads/${Date.now()} - ${image.name}`);
          const result = await uploadBytes(imgRef, image);
          const fileUrl = await getDownloadURL(
            ref(storage, result.ref.fullPath)
          );

          imgs.push({ url: fileUrl, path: result.ref.fullPath });
        }
      }
      // add data into firestore
      const result = await addDoc(collection(db, "ads"), {
        images: imgs,
        title,
        category,
        price: Number(price),
        location,
        contact,
        description,
        isSold: false,
        publishedAt: Timestamp.fromDate(new Date()),
        postedBy: auth.currentUser.uid,
      });

      await setDoc(doc(db, 'favorites', result.id), {
        users: []
      })

      setValues({
        images: [],
        title: "",
        category: "",
        price: "",
        location: "",
        contact: "",
        description,
        loading: false,
      });
      navigate("/");
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };
  return (
    <div className="page-container">
    <div className="content-wrap">
    <form className="form shadow rounded p-4 mt-5" onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Add a Listing</h3>
      <hr className="mb-4"></hr>
      <div className="mb-3 text-center">
        <label htmlFor="image">
          <div className="btn btn-secondary btn-sm">
            <FaCloudUploadAlt size={25} /> Upload Multiple Images
          </div>
        </label>
          <div>
            <br/>
            Note: Photo/s will be displayed once the ad is created.
          </div>
        <input
          type="file"
          id="image"
          style={{ display: "none" }}
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      {imageAlert && (
            <div className="mb-3 text-center">
              <div
                className="alert alert-success"
                onClick={handleCloseImageAlert}
                role="alert"
              >
                {imageAlert}
              </div>
            </div>
          )}


      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={title}
          onChange={handleChange}
          maxLength={30}
          required
        />
      </div>
      <div className="mb-3">
        <select name="category" className="form-select" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={price}
          min="0"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
      <label className="form-label" for="location">Location</label>
        <select name="location" className="form-select" onChange={handleChange} required>
          <option value="">Select BatStateU Campus</option>
          {locations.map((location) => (
            <option value={location} key={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Contact</label>
        <input
          type="text"
          className="form-control"
          name="contact"
          value={contact}
          onChange={handleChange}
          placeholder="e.g. Email, Tel No."
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          cols="30"
          rows="3"
          className="form-control"
          maxLength={200}
          value={description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      {error ? <p className="text-center text-danger">{error}</p> : null}
      <div className="mb-3 text-center">
        <button className="btn btn-secondary btn-sm" disabled={loading}>
          Create
        </button>
      </div>
      
    </form>
    <br/><br/><br/><br/>
    </div>
    <Footer/>
    </div>

  );
};

export default Sell;
