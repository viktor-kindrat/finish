import "./Styles/Account.css"

import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import profileIcon from "./SVG/profile.svg"
import ticketIcon from "./SVG/tickets.svg"
import profileActiveIcon from "./SVG/profile-active.svg"
import ticketActiveIcon from "./SVG/tickets-active.svg"

import PersonalInfo from "../PersonalInfo/PersonalInfo"
import Tickets from "../Tickets/Tickets"
import TripsControll from "../TripsControll/TripsControll"
import UsersControll from "../UsersControll/UsersControll"
import BackControll from "../BackControll/BackControll"

function Account() {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem("logined") || "") !== "true") {
            navigate("/authorization")
        }
    }, [navigate]);

    let isAdmin = localStorage.getItem("isAdmin") || "false";
    return (
        <>
            {
                isAdmin !== "true" ?
                    <section className="Account">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">Андрій <br /> Шевченко</h2>
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
                            <Route path="/" element={<PersonalInfo />} />
                            <Route path="/tickets" element={<Tickets />} />
                        </Routes>
                    </section>
                    :
                    <section className="Account">
                        <div className="Account__menu">
                            <div className="Account__menu-head">
                                <h2 className="Account__menu-headline">Admin</h2>
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
                            <Route path="/users" element={<UsersControll />} />
                            <Route path="/back" element={<BackControll />} />
                        </Routes>
                    </section>
            }
        </>
    )
}

export default Account