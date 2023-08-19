import viberIcon from "./SVG/viber.svg"
import whatsappIcon from "./SVG/whatsapp.svg"
import phoneIcon from "./SVG/phone.svg"

import { Link, useLocation } from "react-router-dom"

function HeaderNavDesktop() {
    let location = useLocation();

    return (
        <div className="Header__nav-wrap">
            <nav className="Header__nav">
                <ul className="Header__nav-list">
                    <li className={`Header__nav-list-item ${location.pathname === "/" ? "Header__nav-list-item_selected" : ""}`}>
                        <Link to={"/"}>Головна</Link>
                    </li>
                    <li className={`Header__nav-list-item ${location.pathname === "/search" ? "Header__nav-list-item_selected" : ""}`}>
                        <Link to={"/search"}>Пошук</Link>
                    </li>
                    <li className={`Header__nav-list-item ${location.pathname === "/instructions" ? "Header__nav-list-item_selected" : ""}`}>
                        <Link to={"/instructions"}>Як забронювати?</Link>
                    </li>
                    <li className={`Header__nav-list-item ${location.pathname.includes("/account") ? "Header__nav-list-item_selected" : ""}`}>
                        <Link to={"/account"}>Мій акаунт</Link>
                    </li>
                </ul>
            </nav>
            <div className="Header__contacts">
                <a href="viber://chat/?number=%2B380508881234" className="Header__contacts-item"><img height={38} src={viberIcon} alt="viber" className="Header__contacts-item-image" /></a>
                <a href="https://wa.me/380508881234" className="Header__contacts-item"><img height={38} src={whatsappIcon} alt="whatsapp" /></a>
                <a href="tel:+380508881234" className="Header__phone">
                    <div className="Header__phone-icon-wrapper">
                        <img height={15} src={phoneIcon} alt="" className="Header__phone-icon" />
                    </div>
                    <div className="Header__phone-info-wrapper">
                        <h3 className="Header__headline">Допомога</h3>
                        <p className="Header__phone-text">+38 (050) 888 12 34</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default HeaderNavDesktop