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
            delay: 0, show: true, message: "Ви впевнені що хочете вийти?", confirmCaption: "Так", rejectCaption: "Ні", confirmAction: () => {
                setUserData(undefined);
                sessionStorage.clear()
                setCookie("userToken", "", 0)
                go("/authorization")
            }, rejectAction: () => { }
        })
    }

    useEffect(() => {
        if (!userData) {
            go("/authorization")
        }
    }, [go, userData])

    return (
        <>
            {
                userData ? userData.role !== "ADMIN" ?
                    <section className="Account">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">{userData.name} {userData.surname}</h2>
                                <button className="Account__logout-btn" onClick={logoutHandler}>Вихід <img src={logoutIcon} alt="log out" /></button>
                            </div>
                            <nav className="Account__menu-nav">
                                <Link to="/account">
                                    <button className={`Account__menu-btn ${location.pathname === "/account" ? "Account__menu-btn_selected" : ""}`}>
                                        <img height={30} src={location.pathname === "/account" ? profileActiveIcon : profileIcon} alt="Профіль" /> Профіль
                                    </button>
                                </Link>
                                <Link to="/account/tickets">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/tickets" ? "Account__menu-btn_selected" : ""}`}>
                                        <img height={30} src={location.pathname === "/account/tickets" ? ticketActiveIcon : ticketIcon} alt="Мої білети" /> Мої білети
                                    </button>
                                </Link>
                            </nav>
                        </div>
                        <Routes>
                            <Route path="/" element={<PersonalInfo {...{ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                            <Route path="/tickets" element={<Tickets {...{ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                        </Routes>
                    </section>
                    :
                    <section className="Account Account_admin">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">Admin</h2>
                                <button className="Account__logout-btn" onClick={logoutHandler}>Вихід <img src={logoutIcon} alt="log out" /></button>
                            </div>
                            <nav className="Account__menu-nav">
                                <Link to="/account">
                                    <button className={`Account__menu-btn ${location.pathname === "/account" ? "Account__menu-btn_selected" : ""}`}>
                                        Рейси
                                    </button>
                                </Link>
                                <Link to="/account/users">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/users" ? "Account__menu-btn_selected" : ""}`}>
                                        Користувачі
                                    </button>
                                </Link>
                                <Link to="/account/back">
                                    <button className={`Account__menu-btn ${location.pathname === "/account/back" ? "Account__menu-btn_selected" : ""}`}>
                                        Повернення
                                    </button>
                                </Link>
                            </nav>
                        </div>
                        <Routes>
                            <Route path="/" element={<TripsControll />} />
                            <Route path="/users" element={<UsersControll {...{ getCookie, setCookie, setUserData, setAlertData, SERVER }} />} />
                            <Route path="/back" element={<BackControll />} />
                        </Routes>
                    </section> : ""
            }
        </>
    )
}

export default Account