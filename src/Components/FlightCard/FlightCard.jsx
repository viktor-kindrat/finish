import "./Styles/FlightCard.css"

import detailsIcon from "./SVG/details.svg"

import BookingMenu from "../BookingMenu/BookingMenu"

import { gsap } from "gsap"
import { useEffect } from "react"

function FlightCard({ id, data, request, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    useEffect(() => {
        gsap.set(".BookingMenu", { y: -100, opacity: 0, display: "none" })
        gsap.set(".FlightCard__opened", { y: -100, opacity: 0, display: "none" })
    }, [])

    let handleOpenBookingMenu = (e) => {
        document.querySelectorAll(".FlightCard__book-btn").forEach(el=>{
            el.style.display = "flex"
            el.parentElement.classList.remove("FlightCard_opened")
        })
        e.target.style.display = "none"
        e.target.parentElement.classList.add("FlightCard_opened")
        let timeline = gsap.timeline();
        timeline.to(".BookingMenu", { y: -100, opacity: 0 })
        timeline.set(".BookingMenu", { display: "none" })
        timeline.to(".FlightCard__opened", { y: -100, opacity: 0 })
        timeline.set(".FlightCard__opened", { display: "none" })
        if (window.innerWidth >= 919) {
            timeline.set(`.FlightCard__opened[data-id="${id}"]`, { display: "flex" })
            timeline.to(`.FlightCard__opened[data-id="${id}"]`, { y: 0, opacity: 1, duration: 0.3 })    
        }
        timeline.set(`.BookingMenu[data-id="${id}"]`, { display: "flex" })
        timeline.to(`.BookingMenu[data-id="${id}"]`, { y: 0, opacity: 1, duration: 0.3 })
    }

    let fromStation = data.stations.filter(item=>(item.country === request.from.country && item.city === request.from.place))[0];
    let toStation = data.stations.filter(item=>(item.country === request.to.country && item.city === request.to.place))[0];
    
    console.log(request)
    return (
        <>
            <article className="FlightCard">
                <div className="FlightCard__locations FlightCard__group">
                    <div className="FlightCard__location-column">
                        <p className="FlightCard__info FlightCard__info_bold">{new Date(fromStation.arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</p>
                        <p className="FlightCard__info">{fromStation.country} - {fromStation.city} <br />({fromStation.location.caption})</p>
                    </div>
                    <div className="FlightCard__arrow">&#8594;</div>
                    <div className="FlightCard__location-column">
                        <p className="FlightCard__info FlightCard__info_bold">{new Date(toStation.arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</p>
                        <p className="FlightCard__info">{toStation.country} - {toStation.city} <br />({toStation.location.caption})</p>
                    </div>
                </div>
                <div className="FlightCard__group">
                    <p className="FlightCard__info">Доросилий</p>
                    <p className="FlightCard__info FlightCard__info_bigBold">{toStation.price.adult - fromStation.price.adult} <span className="FlightCard__info_bold">грн</span></p>
                </div>
                <div className="FlightCard__group FlightCard__group_uderlineonmobile">
                    <p className="FlightCard__info">Дитячий</p>
                    <p className="FlightCard__info FlightCard__info_bigBold">{toStation.price.child - fromStation.price.child} <span className="FlightCard__info_bold">грн</span></p>
                </div>
                <div className="FlightCard__summary">
                    <div className="FlightCard__summary-raw">
                        <div className="FlightCard__summary-sum">{((toStation.price.adult - fromStation.price.adult) * request.passangers.adults) + ((toStation.price.child - fromStation.price.child) * request.passangers.children)}</div>
                        <div className="FlightCard__summary-currency">грн</div>
                    </div>
                    <div className="FlightCard__summary-info">
                        Доросилий: {request.passangers.adults}, Дитячий: {request.passangers.children}
                    </div>
                </div>
                <button onClick={handleOpenBookingMenu} className="FlightCard__book-btn"><p>Забронювати</p><img src={detailsIcon} alt="details" /></button>
            </article>
            <div className="FlightCard__opened" data-id={id}>
                <div className="FlightCard__group">
                    <div className="FlightCard__text">{request.passangers.adults} Дорослий</div>
                    <div className="FlightCard__text FlightCard__text_bigBold">{(toStation.price.adult - fromStation.price.adult) * request.passangers.adults} <span className="FlightCard__text_bold">грн</span></div>
                </div>
                <div className="FlightCard__group">
                    <div className="FlightCard__text FlightCard__text_mediumBold">+</div>
                </div>
                <div className="FlightCard__group">
                    <div className="FlightCard__text">{request.passangers.children} Дитячий</div>
                    <div className="FlightCard__text FlightCard__text_bigBold">{(toStation.price.child - fromStation.price.child) * request.passangers.children} <span className="FlightCard__text_bold">грн</span></div>
                </div>
                <div className="FlightCard__group">
                    <div className="FlightCard__text FlightCard__text_mediumBold">=</div>
                </div>
                <div className="FlightCard__group">
                    <div className="FlightCard__text">Всього</div>
                    <div className="FlightCard__text FlightCard__text_bigBold">{((toStation.price.adult - fromStation.price.adult) * request.passangers.adults) + ((toStation.price.child - fromStation.price.child) * request.passangers.children)} <span className="FlightCard__text_bold">грн</span></div>
                </div>
            </div>
            <BookingMenu id={id} {...{data, request, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER}} />
        </>
    )
}

export default FlightCard