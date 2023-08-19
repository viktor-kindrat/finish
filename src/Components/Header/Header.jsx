import "./Styles/Header.css"

import logo from "./SVG/logo.svg"
import logoMobile from "./SVG/logoMobile.svg"
import HeaderNavDesktop from "./Header-nav-desktop"
import HeaderNavMobile from "./HeaderNavMobile/Header-nav-mobile"

import { useState, useEffect } from "react"

import { gsap } from "gsap"

import { Link } from "react-router-dom"

function Header() {
    let [navOpen, setNavOpen] = useState(false);
    let [screenWidth, setScreenWidht] = useState(window.innerWidth);

    useEffect(() => {
        let handle = () => {
            setNavOpen(false);
            document.body.style.overflowY = "auto";
            document.querySelector(".Header__nav-open-btn").classList.remove("Header__nav-open-btn_close");
            setScreenWidht(window.innerWidth);
            let timeline = gsap.timeline();
            timeline.fromTo(".HeaderNavMobile", {
                yPercent: 0
            }, {
                yPercent: -150,
                duration: 0.3
            })
            timeline.set(".HeaderNavMobile", {
                display: "none"
            })
        }
        window.addEventListener("resize", handle)
        return (() => {
            window.removeEventListener("resize", handle)
        })
    }, [])

    let openMenuMobileHandler = (e) => {
        if (parseInt(screenWidth) <= 919) {
            setNavOpen(!navOpen)
            document.querySelector(".Header__nav-open-btn").classList.toggle("Header__nav-open-btn_close");
            let timeline = gsap.timeline()
            if (!navOpen) {
                timeline.set(".HeaderNavMobile", {
                    display: "flex"
                })
                timeline.fromTo(".HeaderNavMobile", {
                    yPercent: -150
                }, {
                    yPercent: 0,
                    duration: 0.3
                })
                timeline.then(()=>{
                    document.body.style.overflowY = "hidden"
                })
            } else {
                timeline.fromTo(".HeaderNavMobile", {
                    yPercent: 0
                }, {
                    yPercent: -150,
                    duration: 0.3
                })
                timeline.set(".HeaderNavMobile", {
                    display: "none"
                })
                timeline.then(()=>{
                    document.body.style.overflowY = "auto"
                })
            }
        }
    }
    return (
        <>
            <header className="Header">
                <Link to={"/"}>
                    <img height={50} src={logo} alt="logo" className="Header__logo" />
                    <img height={35} width={35} src={logoMobile} alt="logo" className="Header__logo_mobile" />
                </Link>
                {(screenWidth <= 919) ? "" : <HeaderNavDesktop />}
                <button onClick={openMenuMobileHandler} className="Header__nav-open-btn"><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div></button>
            </header>
            <HeaderNavMobile />
        </>
    )
}

export default Header