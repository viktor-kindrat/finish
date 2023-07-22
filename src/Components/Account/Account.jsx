import "./Styles/Account.css"

import { Link, Routes, Route, useLocation } from "react-router-dom"

import profileIcon from "./SVG/profile.svg"
import ticketIcon from "./SVG/tickets.svg"
import profileActiveIcon from "./SVG/profile-active.svg"
import ticketActiveIcon from "./SVG/tickets-active.svg"

import PersonalInfo from "../PersonalInfo/PersonalInfo"

function Account() {
    let location = useLocation()
    console.log(location)
    return (
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
                <Route path="/tickets" element={<div>tickets</div>} />
            </Routes>
        </section>
    )
}

export default Account