import "./Styles/Ticket.css"
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

import rightIcon from "./SVG/right.svg"
import markerIcon from "./SVG/marker.svg"

import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import hrefContext from "../../Context/ServerHostnameContext";

function Ticket({ data, getCookie, setCookie, userData, setUserData, alertData, setAlertData, modalData, setModalData, SERVER }) {
    let go = useNavigate();
    let [pending, setPending] = useState(true);
    let [error, setError] = useState(undefined)
    let storage = useRef(undefined);
    let server = useContext(hrefContext).server;

    let from;
    let to;
    let status;

    let getStatus = (arrivalDate) => {
        let now = new Date();
        let arrivalDateObject = new Date(arrivalDate);
        if (now.getTime() >= arrivalDateObject.getTime()) {
            return "done"
        } else {
            return "active"
        }
    }

    let formatNumberWithSpaces = (input) => {
        let str = `${input}`
        const formattedNumber = str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedNumber;
    }

    if (!pending && storage.current) {
        from = storage.current.stations.filter(item => (item.city === data.passangers[0].userDetails.from.city && item.country === data.passangers[0].userDetails.from.country))[0]
        to = storage.current.stations.filter(item => (item.city === data.passangers[0].userDetails.to.city && item.country === data.passangers[0].userDetails.to.country))[0]
        status = data?.canceled ? "canceled" : getStatus(to.arrivalDate)
    }


    useEffect(() => {
        if (data) {
            setPending(true)
            fetch(`${server}book/get-trip-info/?tripId=${data.tripId}`, {
                headers: { "Authorization": `Baerer ${getCookie("userToken")}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.errorMessage?.toLowerCase().includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                            action: () => {
                                setUserData(undefined);
                                sessionStorage.clear()
                            }
                        })
                        return
                    }

                    // TRANSLATION UPDATE: "Дані отримано" -> "Data received"
                    if (data.message === "Data received") {
                        setPending(false);
                        storage.current = data.data;
                    } else {
                        setError(data.message)
                    }

                })
                .catch(e => console.log(e))
        }
    }, [setPending, data, getCookie, server, setAlertData, setUserData])

    let handleRemoveBooking = (e) => {
        setModalData({
            delay: 0, show: true,
            message: "Are you sure you want to cancel this booking?",
            confirmCaption: "Yes", rejectCaption: "No",
            confirmAction: () => {
                SERVER("Cancelling booking...", "POST", "book/cancel-booking", "application/json", { tripId: data.tripId, ticketId: data.id }, getCookie("userToken"))
                    .then(data => {
                        if (data.errorMessage?.toLowerCase().includes("token")) {
                            setAlertData({
                                delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                                action: () => {
                                    setUserData(undefined);
                                    sessionStorage.clear()
                                }
                            })
                            return
                        }
                        setAlertData({
                            // TRANSLATION UPDATE: "Скасовано успішно!" -> "Canceled successfully!"
                            delay: 0.9, show: true, message: data.message === "Canceled successfully!" ? "Cancelled successfully" : data.message, actionCaption: "Got it", action: () => {
                                SERVER("Updating data...", "GET", "auth/get-info", "application/json", "", getCookie("userToken")).then(data => {
                                    if (data.errorMessage?.toLowerCase().includes("token")) {
                                        setAlertData({
                                            delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                                            action: () => {
                                                setUserData(undefined);
                                                go("/authorization");
                                                sessionStorage.clear();
                                            }
                                        })
                                        return
                                    }
                                    if (data.body) {
                                        if (data.body.verified) {
                                            setUserData(data.body)
                                            sessionStorage.setItem("userData", JSON.stringify(data.body))
                                        } else {
                                            setUserData(undefined);
                                            sessionStorage.clear();
                                            setCookie("userToken", "", 0)
                                        }
                                    }
                                })
                            }
                        })
                    })
            },
            rejectAction: () => { },
        })
    }


    return (
        <>
            {
                error ? "" : (!pending && storage.current) ?
                        <article className={`Ticket Ticket_${status}`}>
                            <div className="Ticket__locations">
                                <div className="Ticket__group Ticket__group_location">
                                    <div className="Ticket__info_bold Ticket__info">{new Date(from.arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                                    <div className="Ticket__info">{from.country} - {from.city} <br /><a href={`https://www.google.com/maps?q=${from.location.longitude},${from.location.latitude}`}>({from.location.caption}) <img src={markerIcon} alt="marker" /></a></div>
                                </div>
                                <div className="Ticket__group Ticket__group_arrow">
                                    <div className="Ticket__sign">
                                        <img src={rightIcon} height={20} width={20} alt="->" />
                                    </div>
                                </div>
                                <div className="Ticket__group Ticket__group_location">
                                    <div className="Ticket__info_bold Ticket__info">{new Date(to.arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                                    <div className="Ticket__info">{to.country} - {to.city} <br /><a href={`https://www.google.com/maps?q=${to.location.longitude},${to.location.latitude}`}>({to.location.caption}) <img src={markerIcon} alt="marker" /></a></div>
                                </div>
                            </div>
                            <div className="Ticket__group">
                                <div className="Ticket__info_bigBold">{formatNumberWithSpaces((data.passangers.filter(item => item.age === "adult").length * (to.price.adult - from.price.adult)) + (data.passangers.filter(item => item.age === "child").length * (to.price.child - from.price.child)))} €</div>
                                <div className="Ticket__info Ticket__info_small"> Adult: {data.passangers.filter(item => item.age === "adult").length}, Child: {data.passangers.filter(item => item.age === "child").length}</div>
                                <div className="Ticket__info Ticket__info_small"> Seat(s): {data.passangers.map(i=>i.placeNumber).join(", ")}</div>
                            </div>
                            <button onClick={status === "active" ? handleRemoveBooking : () => { }} disabled={status !== "active"} className="Ticket__action">{status === "canceled" ? "Canceled" : status === "done" ? "Completed" : status === "active" ? "Cancel" : "Error"}</button>
                        </article>
                        : <BuiltInLoader />
            }
        </>
    )
}

export default Ticket