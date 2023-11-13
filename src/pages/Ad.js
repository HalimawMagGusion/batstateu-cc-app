import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    where,
    addDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { LuContact2 } from "react-icons/lu";
import Moment from "react-moment";
import useSnapshot from "../utils/useSnapshot";
import { toggleFavorite } from "../utils/fav";
import Sold from "../components/Sold";
import Footer from "../components/Footer";

const Ad = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [ad, setAd] = useState();
    const [idx, setIdx] = useState(0);
    const [seller, setSeller] = useState();
    const [reports, setReports] = useState([]);
    const [showNumber, setShowNumber] = useState(false);

    const { val } = useSnapshot("favorites", id);

    const getAd = async () => {
        const docRef = doc(db, "ads", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setAd(docSnap.data());

            const sellerRef = doc(db, "users", docSnap.data().postedBy);
            const sellerSnap = await getDoc(sellerRef);

            if (sellerSnap.exists()) {
                setSeller(sellerSnap.data());
            }
        }

        // get reports
        const reportsRef = collection(db, "reports");
        const q = query(reportsRef, where("ad", "==", id));
        const reportsSnap = await getDocs(q);
        let reports = [];
        reportsSnap.forEach((doc) => reports.push(doc.data()));
        setReports(reports);
    };

    useEffect(() => {
        getAd();
    }, []);

    const deleteAd = async () => {
        const confirm = window.confirm(`Delete ${ad.title}?`);
        if (confirm) {
            // delete images
            for (const image of ad.images) {
                const imgRef = ref(storage, image.path);
                await deleteObject(imgRef);
            }
            // delete fav doc from firestore
            await deleteDoc(doc(db, "favorites", id));
            // delete ad doc from firestore
            await deleteDoc(doc(db, "ads", id));
            // navigate to seller profile

            // delete reports
            const reportsRef = collection(db, "reports");
            const q = query(reportsRef, where("ad", "==", id));
            const reportsSnap = await getDocs(q);
            reportsSnap.forEach(async (doc) => {
                await deleteDoc(doc(db, "reports", doc.id));
            });
            navigate(`/profile/${auth.currentUser.uid}`);
        }
    };

    const updateStatus = async () => {
        await updateDoc(doc(db, "ads", id), {
            isSold: true,
        });
        getAd();
    };

    const createChatroom = async () => {
        const loggedInUser = auth.currentUser.uid;
        const chatId =
            loggedInUser > ad.postedBy
                ? `${loggedInUser}.${ad.postedBy}.${id}`
                : `${ad.postedBy}.${loggedInUser}.${id}`;

        await setDoc(doc(db, "messages", chatId), {
            ad: id,
            users: [loggedInUser, ad.postedBy],
        });

        navigate("/chat", { state: { ad } });
    };

    const reportAd = async () => {
        await addDoc(collection(db, "reports"), {
            ad: id,
            status: "pending",
            adTitle: ad.title,
            reportedBy: auth.currentUser.uid,
            reportedAt: new Date(),
        });
        window.location.reload();
    };

    

    return ad ? (
    <div className="page-container">
    <div className="content-wrap">
        <div className="mt-5 container">
            <div className="row">
                <div
                    id="carouselExample"
                    className="carousel slide col-md-8 position-relative"
                >
                    {ad.isSold && <Sold singleAd={true} />}
                    <div className="carousel-inner">
                        {ad.images.map((image, i) => (
                            <div
                                className={`carousel-item ${
                                    idx === i ? "active" : ""
                                }`}
                                key={i}
                            >
                                <a href={image.url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={image.url}
                                        className="d-block w-100"
                                        alt={ad.title}
                                        style={{
                                            height: "500px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </a>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExample"
                                    data-bs-slide="prev"
                                    onClick={() => setIdx(i)}
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                        Previous
                                    </span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExample"
                                    data-bs-slide="next"
                                    onClick={() => setIdx(i)}
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                        Next
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title">
                                    ₱ {Number(ad.price).toLocaleString()}
                                </h5>
                                {val?.users?.includes(auth.currentUser?.uid) ? (
                                    <AiFillHeart
                                        size={20}
                                        onClick={() =>
                                            toggleFavorite(val.users, id)
                                        }
                                        className="text-danger"
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={20}
                                        onClick={() =>
                                            toggleFavorite(val.users, id)
                                        }
                                        className="text-danger"
                                    />
                                )}
                            </div>
                            <h6 className="card-subtitle mb-2">{ad.title}</h6>
                            <div className="d-flex justify-content-between">
                                <p className="card-text">
                                    {ad.location} -{" "}
                                    <small>
                                        <Moment fromNow>
                                            {ad.publishedAt.toDate()}
                                        </Moment>
                                    </small>
                                </p>
                                {ad.postedBy === auth.currentUser?.uid && (
                                    <FaTrashAlt
                                        size={20}
                                        className="text-danger"
                                        onClick={deleteAd}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3 ">
                        <div className="card-body">
                            <h5 className="card-title">Seller Description</h5>
                            <Link to={`/profile/${ad.postedBy}`}>
                                <div className="d-flex align-items-center">
                                    {seller?.photoUrl ? (
                                        <img
                                            src={seller.photoUrl}
                                            alt={seller.name}
                                            style={{
                                                border: "1px solid #ccc",
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                marginRight: "10px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        <FaUserCircle
                                            size={25}
                                            className="me-2"
                                        />
                                    )}
                                    <h6>{seller?.name}</h6>
                                </div>
                            </Link>
                        </div>
                        <div>
                            {auth.currentUser ? (
                                <div className="text-center">
                                    {showNumber ? (
                                        <p>
                                            <LuContact2 size={20} />{" "}
                                            {ad.contact}
                                        </p>
                                    ) : (
                                        <button
                                            className="btn btn-secondary btn-sm mb-3"
                                            onClick={() => setShowNumber(true)}
                                        >
                                            Show Contact Info
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={
                                            "btn btn-secondary btn-sm mb-3" +
                                            (!showNumber ? " ms-2" : "")
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#myModal"
                                        disabled={
                                            ad.postedBy ===
                                                auth.currentUser?.uid ||
                                            ad.isSold ||
                                            reports.find(
                                                (report) =>
                                                    report.reportedBy ===
                                                    auth.currentUser?.uid
                                            )
                                        }
                                    >
                                        {reports.find(
                                            (report) =>
                                                report.reportedBy ===
                                                auth.currentUser?.uid
                                        )
                                            ? "Reported"
                                            : "Report"}
                                    </button>
                                    <br />
                                </div>
                            ) : (
                                <p className="text-center">
                                    <Link
                                        to="/auth/login"
                                        state={{ from: location }}
                                        className="text-primary"
                                    >
                                        Login
                                    </Link>{" "}
                                    to see contact info
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        {!ad.isSold &&
                            ad.postedBy === auth.currentUser?.uid && (
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={updateStatus}
                                >
                                    Mark as Sold
                                </button>
                            )}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3>Description</h3>
                <p>{ad.description}</p>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Report this ad?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={reportAd}
                                >
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/><br/>
        </div>
        <Footer/>
        </div>
    ) : null;
};

export default Ad;
