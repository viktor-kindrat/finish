import "./Styles/FlightCard.css"

import detailsIcon from "./SVG/details.svg"
import markerIcon from "./SVG/marker.svg"
import rightIcon from "./SVG/right.svg"

import BookingMenu from "../BookingMenu/BookingMenu"
import VisualizeMap from "../UI/VisualizeMap/VisualizeMap"

import { gsap } from "gsap"
import { useEffect, useContext } from "react"

import APIkeyContext from "../../Context/APIkeysContext";

function FlightCard({ id, data, searchingData, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    useEffect(() => {
        gsap.set(".BookingMenu", { y: -100, opacity: 0, display: "none" })
        gsap.set(".FlightCard__opened", { y: -100, opacity: 0, display: "none" })
    }, [])

    let APIKEY = useContext(APIkeyContext).googleMaps;

    let handleOpenBookingMenu = (e) => {
        document.querySelectorAll(".FlightCard__book-btn").forEach(el => {
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

    let fromStation = data.stations.filter(item => (item.country === searchingData.from.country && item.city === searchingData.from.place))[0];
    let toStation = data.stations.filter(item => (item.country === searchingData.to.country && item.city === searchingData.to.place))[0];


    const redirectToGoogleMaps = (lat, lng) => {
        // Create the URL for Google Maps with the specified latitude and longitude
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

        // Open the URL in a new tab
        window.open(mapsUrl, '_blank');
    };

    const setModalMap = (lng, lat) => {
        setModalData({
            delay: 0, show: true,
            message: <div className="Modal__map">
                <VisualizeMap language="en" apiKey={APIKEY} lat={lng} lng={lat} />
            </div>,
            confirmCaption: "Maps",
            rejectCaption: "Close",
            confirmAction: () => {
                redirectToGoogleMaps(lng, lat)
                setModalData({ ...modalData, message: "ok" })
            },
            rejectAction: () => {
                setModalData({ ...modalData, message: "ok" })
            },
        })
    }

    return (
        <>
            {
                (fromStation && toStation) ? <>
                    <article className="FlightCard">
                        <div className="FlightCard__free-places">Seats available: {63 - data.places.length}</div>
                        <div className="FlightCard__locations FlightCard__group">
                            <div className="FlightCard__location-column">
                                <p className="FlightCard__info FlightCard__info_bold">{new Date(fromStation.arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</p>
                                <p className="FlightCard__info">{fromStation.country} - {fromStation.city} <br /><span onClick={(e) => setModalMap(fromStation.location.longitude, fromStation.location.latitude)}>({fromStation.location.caption}) <img src={markerIcon} height={20} alt="marker" /></span></p>
                            </div>
                            <div className="FlightCard__arrow">
                                <img src={rightIcon} height={20} width={20} alt="->" />
                            </div>
                            <div className="FlightCard__location-column">
                                <p className="FlightCard__info FlightCard__info_bold">{new Date(toStation.arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</p>
                                <p className="FlightCard__info">{toStation.country} - {toStation.city} <br /><span onClick={(e) => setModalMap(toStation.location.longitude, toStation.location.latitude)}>({toStation.location.caption}) <img src={markerIcon} width={20} alt="marker" /></span></p>
                            </div>
                        </div>
                        <div className="FlightCard__group">
                            <p className="FlightCard__info">Adult</p>
                            <p className="FlightCard__info FlightCard__info_bigBold">{toStation.price.adult - fromStation.price.adult} <span className="FlightCard__info_bold">€</span></p>
                        </div>
                        <div className="FlightCard__group FlightCard__group_uderlineonmobile">
                            <p className="FlightCard__info">Child</p>
                            <p className="FlightCard__info FlightCard__info_bigBold">{toStation.price.child - fromStation.price.child} <span className="FlightCard__info_bold">€</span></p>
                        </div>
                        <div className="FlightCard__summary">
                            <div className="FlightCard__summary-raw">
                                <div className="FlightCard__summary-sum">{((toStation.price.adult - fromStation.price.adult) * searchingData.passangers.adults) + ((toStation.price.child - fromStation.price.child) * searchingData.passangers.children)}</div>
                                <div className="FlightCard__summary-currency">€</div>
                            </div>
                            <div className="FlightCard__summary-info">
                                Adults: {searchingData.passangers.adults}, Children: {searchingData.passangers.children}
                            </div>
                        </div>
                        <button onClick={handleOpenBookingMenu} className="FlightCard__book-btn"><p>Book</p><img src={detailsIcon} alt="details" /></button>
                    </article>
                    <div className="FlightCard__opened" data-id={id}>
                        <div className="FlightCard__group">
                            <div className="FlightCard__text">{searchingData.passangers.adults} Adult</div>
                            <div className="FlightCard__text FlightCard__text_bigBold">{(toStation.price.adult - fromStation.price.adult) * searchingData.passangers.adults} <span className="FlightCard__text_bold">€</span></div>
                        </div>
                        <div className="FlightCard__group">
                            <div className="FlightCard__text FlightCard__text_mediumBold">+</div>
                        </div>
                        <div className="FlightCard__group">
                            <div className="FlightCard__text">{searchingData.passangers.children} Child</div>
                            <div className="FlightCard__text FlightCard__text_bigBold">{(toStation.price.child - fromStation.price.child) * searchingData.passangers.children} <span className="FlightCard__text_bold">€</span></div>
                        </div>
                        <div className="FlightCard__group">
                            <div className="FlightCard__text FlightCard__text_mediumBold">=</div>
                        </div>
                        <div className="FlightCard__group">
                            <div className="FlightCard__text">Total</div>
                            <div className="FlightCard__text FlightCard__text_bigBold">{((toStation.price.adult - fromStation.price.adult) * searchingData.passangers.adults) + ((toStation.price.child - fromStation.price.child) * searchingData.passangers.children)} <span className="FlightCard__text_bold">€</span></div>
                        </div>
                    </div>
                    <BookingMenu id={id} {...{ data, searchingData, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }} />
                </> : ''
            }
        </>
    )
}

export default FlightCard