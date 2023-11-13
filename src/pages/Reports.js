import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    getDoc,
    deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../FirebaseConfig";
import Moment from "react-moment";

const Reports = () => {
    const [reports, setReports] = useState([]);

    const getReports = async () => {
        const reportsRef = collection(db, "reports");
        const reportsDocs = await getDocs(reportsRef);
        let reports = [];

        // Get the data of each report
        await Promise.all(
            reportsDocs.docs.map(async (rep) => {
                const reportData = {
                    ...rep.data(),
                    id: rep.id,
                };

                const reportedBy = await getDoc(
                    doc(db, "users", reportData.reportedBy)
                );
                const ad = await getDoc(doc(db, "ads", reportData.ad));

                reportData.reportedBy = reportedBy.data();
                reportData.ad = {
                    ...ad.data(),
                    id: ad.id,
                };

                reports.push(reportData);
            })
        );

        return reports;
    };

    useEffect(() => {
        getReports().then((reports) => setReports(reports));
    }, []);

    return (
        <div className="container mt-5">
            <h3>Reports</h3>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">Reported By</th>
                        <th scope="col">Ad</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.reportedBy.name}</td>
                                <td>
                                    {report.status !== "resolved" ? (
                                        <Link
                                            to={`/${report.ad.category.toLowerCase()}/${
                                                report.ad.id
                                            }`}
                                            className="text-decoration-none"
                                        >
                                            {report.ad.title}
                                        </Link>
                                    ) : (
                                        report.adTitle
                                    )}
                                </td>
                                <td>
                                    <Moment fromNow>{report.createdAt}</Moment>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        disabled={
                                            report.status !== "pending" ||
                                            report.ad.isSold
                                        }
                                        defaultValue={
                                            report.ad.isSold
                                                ? "sold"
                                                : "pending"
                                        }
                                        onChange={(e) =>
                                            updateDoc(
                                                doc(db, "reports", report.id),
                                                {
                                                    status: e.target.value,
                                                }
                                            ).then(() => {
                                                getReports().then((reports) =>
                                                    setReports(reports)
                                                );

                                                deleteDoc(
                                                    doc(db, "ads", report.ad.id)
                                                );
                                            })
                                        }
                                    >
                                        <option
                                            disabled
                                            value={
                                                report.ad.isSold
                                                    ? "sold"
                                                    : "pending"
                                            }
                                        >
                                            {report.ad.isSold
                                                ? "Sold"
                                                : report.status !== "pending"
                                                ? report.status
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  report.status.slice(1)
                                                : " Select status"}
                                        </option>
                                        <option value="reject">Reject</option>
                                        <option value="resolved">
                                            Resolved
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
