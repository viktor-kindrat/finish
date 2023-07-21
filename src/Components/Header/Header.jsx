import "./Styles/Header.css"

import logo from "./Images/logo.webp"
import HeaderNavDesktop from "./Header-nav-desktop"
import HeaderNavMobile from "./HeaderNavMobile/Header-nav-mobile"

import { useState, useEffect } from "react"

import { gsap } from "gsap"

function Header() {
    let [navOpen, setNavOpen] = useState(false);
    let [screenWidth, setScreenWidht] = useState(window.innerWidth);

    useEffect(() => {
        let handle = () => {
            setNavOpen(false);
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
            }
        }
    }
    return (
        <>
            <header className="Header">
                <img height={50} src={logo} alt="logo" className="Header__logo" />
                {(screenWidth <= 919) ? "" : <HeaderNavDesktop />}
                <button onClick={openMenuMobileHandler} className="Header__nav-open-btn"><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div><div className="Header__nav-open-btn-visual"></div></button>
            </header>
            <HeaderNavMobile />
        </>
    )
}

export default Header