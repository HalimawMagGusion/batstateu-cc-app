import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import VerificationSent from "./pages/auth/VerificationSent";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import Sell from "./pages/Sell";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import MyFavorites from "./pages/MyFavorites";
import Ad from "./pages/Ad";
import About from './pages/About';
import Terms from './pages/Terms';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <ScrollToTop/>
                <ScrollToTopButton/>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/sell" element={<Sell />} />
                        <Route path="/favorites" element={<MyFavorites />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/:category/:id" element={<Ad />} />
                        <Route path="/" element={<Home />} />

                        {/* Admin Routes */}
                        <Route element={<PrivateRoute isAdmin />}>
                            <Route
                                path="/admin/reports"
                                element={<Reports />}
                            />
                            <Route path="/admin/users" element={<Users />} />
                        </Route>
                    </Route>
                    <Route path="/about" element = {<About />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/auth/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/verification-sent"
                        element={<VerificationSent />}
                    />
                    <Route path="terms-and-conditions" element={<Terms />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
