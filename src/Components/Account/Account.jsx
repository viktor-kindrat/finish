import "./Styles/Account.css"

import { Link, Routes, Route } from "react-router-dom"

import profileIcon from "./SVG/profile.svg"
import ticketIcon from "./SVG/tickets.svg"

function Account () {
    return (
        <section className="Account">
            <div className="Account__menu">
                <div className="Account__menu-head">
                    <h2 className="Account__menu-headline">Андрій <br /> Шевченко</h2>
                </div>
                <Link to="/account">
                    <button className="Account__menu-btn">
                        <img src={profileIcon} alt="Профіль" /> Профіль
                    </button>
                </Link>
                <Link to="/account/tickets">
                    <button className="Account__menu-btn">
                        <img src={ticketIcon} alt="Мої білети" /> Мої білети
                    </button>
                </Link>
            </div>
            <Routes>
                <Route path="/" element={<div>account</div>} />
                <Route path="/tickets" element={<div>tickets</div>} />
            </Routes>
        </section>
    )
}

export default Account