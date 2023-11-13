import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");

    const getUsers = async () => {
        const usersRef = collection(db, "users");
        const usersDocs = await getDocs(usersRef);
        let users = [];

        // Get the data of each user
        await Promise.all(
            usersDocs.docs.map(async (user) => {
                const userData = {
                    ...user.data(),
                    id: user.id,
                };

                users.push(userData);
            })
        );

        return users;
    };

    useEffect(() => {
        getUsers().then((users) => setUsers(users));
    }, []);

    const handleBan = async (id) => {
        await updateDoc(doc(db, "users", id), {
            isBanned: true,
        });
        setUsers(
            users.map((u) => {
                if (u.id === id) {
                    u.isBanned = true;
                }
                return u;
            })
        );
    };

    const handleUnban = async (id) => {
        await updateDoc(doc(db, "users", id), {
            isBanned: false,
        });
        setUsers(
            users.map((u) => {
                if (u.id === id) {
                    u.isBanned = false;
                }
                return u;
            })
        );
    };

    return (
        <div className="container mt-5">
            <h3>Users</h3>
            {/* create a table that displays all the user details (name, email, isOnline, verified) and add actions (ban, unban) */}
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Is Online</th>
                        <th scope="col">Verified</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isOnline ? "Yes" : "No"}</td>
                                <td>{user.verified ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        className="btn btn-danger ms-3"
                                        disabled={user.isBanned}
                                        onClick={() => handleBan(user.id)}
                                    >
                                        Ban
                                    </button>
                                    <button
                                        className="btn btn-success ms-3"
                                        disabled={!user.isBanned}
                                        onClick={() => handleUnban(user.id)}
                                    >
                                        Unban
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
