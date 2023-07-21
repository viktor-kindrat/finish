import "./Styles/PhoneMenu.css"

import homeIcon from "./SVG/main.svg"
// import homeActiveIcon from "./SVG/main-active.svg"
import ticketsIcon from "./SVG/tickets.svg"
// import ticketsActiveIcon from "./SVG/tickets-active.svg"
import profileIcon from "./SVG/profile.svg"
// import profileActiveIcon from "./SVG/profile-active.svg"
import bookIcon from "./SVG/book.svg"
// import bookActiveIcon from "./SVG/book-active.svg"

import { Link } from "react-router-dom"

function PhoneMenu() {
    return (
        <nav className="PhoneMenu">
            <Link to={"/"}>
                <button className="PhoneMenu-btn">
                    <img src={homeIcon} alt="home" className="PhoneMenu-icon" height={25} />
                    <p className="PhoneMenu-text">Головна</p>
                </button>
            </Link>
            <Link to={"/search"}>
                <button className="PhoneMenu-btn">
                    <img src={bookIcon} alt="home" className="PhoneMenu-icon" height={25} />
                    <p className="PhoneMenu-text">Бронювати</p>
                </button>
            </Link>
            <Link to={"/account/tickets"}>
                <button className="PhoneMenu-btn">
                    <img src={ticketsIcon} alt="home" className="PhoneMenu-icon" height={25} />
                    <p className="PhoneMenu-text">Мої білети</p>
                </button>
            </Link>
            <Link to={"/account"}>
                <button className="PhoneMenu-btn">
                    <img src={profileIcon} alt="home" className="PhoneMenu-icon" height={25} />
                    <p className="PhoneMenu-text">Профіль</p>
                </button>
            </Link>
        </nav>
    )
}

export default PhoneMenu