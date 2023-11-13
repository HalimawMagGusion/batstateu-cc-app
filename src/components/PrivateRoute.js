import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAdmin }) => {
    const { user } = useContext(AuthContext);
    const [userDoc, setUserDoc] = useState({});

    const getUserDoc = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setUserDoc(docSnap.data());
        }
    };

    useEffect(() => {
        getUserDoc();
    }, [user]);

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    if (isAdmin && !userDoc.isAdmin && userDoc.isAdmin !== undefined) {
        console.log(userDoc);
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
