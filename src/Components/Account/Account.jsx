import "./Styles/Account.css"

import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import profileIcon from "./SVG/profile.svg"
import ticketIcon from "./SVG/tickets.svg"
import profileActiveIcon from "./SVG/profile-active.svg"
import ticketActiveIcon from "./SVG/tickets-active.svg"
import logoutIcon from "./SVG/logout.svg"

import PersonalInfo from "../PersonalInfo/PersonalInfo"
import Tickets from "../Tickets/Tickets"
import TripsControll from "../TripsControll/TripsControll"
import UsersControll from "../UsersControll/UsersControll"
import BackControll from "../BackControll/BackControll"

function Account({ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let location = useLocation();
    let go = useNavigate();

    let logoutHandler = () => {
        setModalData({
            delay: 0, show: true, message: "Are you sure you want to log out?", confirmCaption: "Yes", rejectCaption: "No", confirmAction: () => {
                setUserData(undefined);
                sessionStorage.clear()
                setCookie("userToken", "", 0)
                go("/authorization")
            }, rejectAction: () => { }
        })
    }

    useEffect(() => {
        if (userData) {
            if (userData.role === "USER") {
                SERVER("Data update", "GET", "auth/get-info", "application/json", "", getCookie("userToken")).then(data => {
                    if (data.errorMessage?.toLowerCase().includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                            action: () => {
                                setUserData(undefined);
                                go("/authorization");
                                sessionStorage.clear();
                            }
                        })
                        return
                    }
                    if (data.body) {
                        if (data.body.verified) {
                            setUserData(data.body)
                            sessionStorage.setItem("userData", JSON.stringify(data.body))
                        } else {
                            setUserData(undefined);
                            sessionStorage.clear();
                            setCookie("userToken", "", 0)
                        }
                    }
                })
            }
        } else {
            go("/authorization")
        } // eslint-disable-next-line
    }, [SERVER, getCookie, go, setAlertData, setCookie, setUserData])

    return (
        <>
            {
                userData ? userData.role !== "ADMIN" ?
                    <section className="Account">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">{userData.name} {userData.surname}</h2>
                                <button className="Account__logout-btn" onClick={logoutHandler}>Log out <img src={logoutIcon} alt="log out" /></button>
                            </div>
                            <nav className="Account__menu-nav">
                                <Link to="/account">
                                    <button className={`Account__menu-btn ${location.pathname === "/account" ? "Account__menu-btn_selected" : ""}`}>
                                        <img height={30} src={location.pathname === "/account" ? profileActiveIcon : profileIcon} alt="Profile" /> Profile
                                    </button>
                                </Link>
                                <Link to="/account/tickets">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/tickets" ? "Account__menu-btn_selected" : ""}`}>
                                        <img height={30} src={location.pathname === "/account/tickets" ? ticketActiveIcon : ticketIcon} alt="My tickets" /> My Tickets
                                    </button>
                                </Link>
                            </nav>
                        </div>
                        <Routes>
                            <Route path="/" element={<PersonalInfo {...{ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                            <Route path="/tickets" element={<Tickets {...{ modalData, setModalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                        </Routes>
                    </section>
                    :
                    <section className="Account Account_admin">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">Admin</h2>
                                <button className="Account__logout-btn" onClick={logoutHandler}>Log out <img src={logoutIcon} alt="log out" /></button>
                            </div>
                            <nav className="Account__menu-nav">
                                <Link to="/account">
                                    <button className={`Account__menu-btn ${location.pathname === "/account" ? "Account__menu-btn_selected" : ""}`}>
                                        Trips
                                    </button>
                                </Link>
                                <Link to="/account/users">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/users" ? "Account__menu-btn_selected" : ""}`}>
                                        Users
                                    </button>
                                </Link>
                                <Link to="/account/back">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/back" ? "Account__menu-btn_selected" : ""}`}>
                                        Refunds
                                    </button>
                                </Link>
                            </nav>
                        </div>
                        <Routes>
                            <Route path="/" element={<TripsControll {...{ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                            <Route path="/users" element={<UsersControll {...{ getCookie, setCookie, setUserData, setAlertData, SERVER }} />} />
                            <Route path="/back" element={<BackControll {...{ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                        </Routes>
                    </section> : ""
            }
        </>
    )
}

export default Account