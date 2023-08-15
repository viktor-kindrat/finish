import "./Styles/PhoneMenu.css"

import homeIcon from "./SVG/main.svg"
import homeActiveIcon from "./SVG/main-active.svg"
import ticketsIcon from "./SVG/tickets.svg"
import ticketsActiveIcon from "./SVG/tickets-active.svg"
import profileIcon from "./SVG/profile.svg"
import profileActiveIcon from "./SVG/profile-active.svg"
import bookIcon from "./SVG/book.svg"
import bookActiveIcon from "./SVG/book-active.svg"

import { Link, useLocation } from "react-router-dom"

function PhoneMenu({userData}) {
    let location = useLocation();
    let isAdmin = userData.role === "ADMIN"
    return (
        <nav className="PhoneMenu">
            {
                !isAdmin ? <>
                    <Link to={"/"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/" ? homeActiveIcon : homeIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Головна</p>
                        </button>
                    </Link>
                    <Link to={"/search"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/search" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/search" ? bookActiveIcon : bookIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Бронювати</p>
                        </button>
                    </Link>
                    <Link to={"/account/tickets"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/account/tickets" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/account/tickets" ? ticketsActiveIcon : ticketsIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Мої білети</p>
                        </button>
                    </Link>
                    <Link to={"/account"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/account" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/account" ? profileActiveIcon : profileIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Профіль</p>
                        </button>
                    </Link>
                </> : <>
                    <Link to={"/account"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/account" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/account" ? bookActiveIcon : bookIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Рейси</p>
                        </button>
                    </Link>
                    <Link to={"/account/users"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/account/users" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/account/users" ? profileActiveIcon : profileIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Користувачі</p>
                        </button>
                    </Link>
                    <Link to={"/account/back"}>
                        <button className={`PhoneMenu-btn ${location.pathname === "/account/back" ? "PhoneMenu-btn_selected" : ""}`}>
                            <img src={location.pathname === "/account/back" ? ticketsActiveIcon : ticketsIcon} alt="home" className="PhoneMenu-icon" height={25} />
                            <p className="PhoneMenu-text">Повернення</p>
                        </button>
                    </Link>
                </>
            }
        </nav>
    )
}

export default PhoneMenu