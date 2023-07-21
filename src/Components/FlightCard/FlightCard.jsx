import "./Styles/FlightCard.css"

import detailsIcon from "./SVG/details.svg"

import BookingMenu from "../BookingMenu/BookingMenu"

import { gsap } from "gsap"
import { useEffect } from "react"

function FlightCard({ id }) {
    useEffect(() => {
        gsap.set(".BookingMenu", { y: -100, opacity: 0, display: "none" })
    }, [])

    let handleOpenBookingMenu = (e) => {
        let timeline = gsap.timeline();
        timeline.to(".BookingMenu", { y: -100, opacity: 0 })
        timeline.set(".BookingMenu", { display: "none" })
        timeline.set(`.BookingMenu[data-id="${id}"]`, { display: "flex" })
        timeline.to(`.BookingMenu[data-id="${id}"]`, { y: 0, opacity: 1, duration: 0.3 })
    }
    return (
        <>
            <article className="FlightCard">
                <div className="FlightCard__locations FlightCard__group">
                    <div className="FlightCard__location-column">
                        <p className="FlightCard__info FlightCard__info_bold">20:45 пт, 3 лист.</p>
                        <p className="FlightCard__info">Україна - Київ (Центральний автовокзал)</p>
                    </div>
                    <div className="FlightCard__arrow">&#8594;</div>
                    <div className="FlightCard__location-column">
                        <p className="FlightCard__info FlightCard__info_bold">20:45 пт, 3 лист.</p>
                        <p className="FlightCard__info">Україна - Київ (Центральний автовокзал)</p>
                    </div>
                </div>
                <div className="FlightCard__group">
                    <p className="FlightCard__info">Доросилий</p>
                    <p className="FlightCard__info FlightCard__info_bigBold">5 048 <span className="FlightCard__info_bold">грн</span></p>
                </div>
                <div className="FlightCard__group FlightCard__group_uderlineonmobile">
                    <p className="FlightCard__info">Дитячий</p>
                    <p className="FlightCard__info FlightCard__info_bigBold">3 048 <span className="FlightCard__info_bold">грн</span></p>
                </div>
                <div className="FlightCard__summary">
                    <div className="FlightCard__summary-raw">
                        <div className="FlightCard__summary-sum">14 048 <sup>,00</sup></div>
                        <div className="FlightCard__summary-currency">грн</div>
                    </div>
                    <div className="FlightCard__summary-info">
                        Доросилий: 2, Дитячий: 1
                    </div>
                </div>
                <button onClick={handleOpenBookingMenu} className="FlightCard__book-btn"><p>Забронювати</p><img src={detailsIcon} alt="details" /></button>
            </article>
            <BookingMenu id={id} />
        </>
    )
}

export default FlightCard