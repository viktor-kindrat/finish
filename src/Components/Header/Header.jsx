import "./Styles/Header.css"

import logo from "./Images/logo.png"
import HeaderNavDesktop from "./Header-nav-desktop"
import HeaderNavMobile from "./HeaderNavMobile/Header-nav-mobile"

import { useState, useEffect } from "react"

function Header() {
    let [navOpen, setNavOpen] = useState(false);
    let [screenWidth, setScreenWidht] = useState(window.innerWidth);
    
    useEffect(()=>{
        let handle = ()=> {
            setNavOpen(false);
            document.querySelector(".Header__nav-open-btn").classList.remove("Header__nav-open-btn_close");
            setScreenWidht(window.innerWidth)
        }
        window.addEventListener("resize", handle)
        return (()=>{
            window.removeEventListener("resize", handle)
        })
    }, [])

    let openMenuMobileHandler = (e)=>{
        if (parseInt(screenWidth) <= 919) {
            setNavOpen(!navOpen)
            document.querySelector(".Header__nav-open-btn").classList.toggle("Header__nav-open-btn_close")
        }
    }
    return (
        <header className="Header">
            <img height={50} src={logo} alt="logo" className="Header__logo" />
            {
                (screenWidth <= 919) ? "" : <HeaderNavDesktop />
            }
            <HeaderNavMobile />
            <button onClick={openMenuMobileHandler} className="Header__nav-open-btn"><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div></button>
        </header>
    )
}

export default Header