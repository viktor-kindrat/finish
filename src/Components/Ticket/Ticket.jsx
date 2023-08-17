import "./Styles/Ticket.css"
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

import rightIcon from "./SVG/right.svg"

import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import hrefContext from "../../Context/ServerHostnameContext";

function Ticket({ data, getCookie, setCookie, userData, setUserData, alertData, setAlertData, modalData, setModalData, SERVER }) {
    let go = useNavigate();
    let [pending, setPending] = useState(true);
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
        console.log(from, to)
    }


    useEffect(() => {
        console.log(data)
        if (data) {
            setPending(true)
            fetch(`${server}book/get-trip-info/?tripId=${data.tripId}`, {
                headers: { "Authorization": `Baerer ${getCookie("userToken")}` }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.errorMessage?.toLowerCase().includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Схоже термін дії вашого входу минув. Увійдіть знову!", actionCaption: "Увійти знову",
                            action: () => {
                                setUserData(undefined);
                                sessionStorage.clear()
                            }
                        })
                        return
                    }

                    setPending(false);
                    storage.current = data.data;
                })
                .catch(e => console.log(e))
        }
    }, [setPending, data, getCookie, server, setAlertData, setUserData])

    let handleRemoveBooking = (e) => {
        setModalData({
            delay: 0, show: true,
            message: "Ви впевнені що хочете скасувати бронювання?",
            confirmCaption: "Так", rejectCaption: "Ні",
            confirmAction: () => {
                SERVER("Скасовуємо бронювання", "POST", "book/cancel-booking", "application/json", { tripId: data.tripId, ticketId: data.id }, getCookie("userToken"))
                    .then(data => {
                        console.log(data)
                        if (data.errorMessage?.toLowerCase().includes("token")) {
                            setAlertData({
                                delay: 0.9, show: true, message: "Схоже термін дії вашого входу минув. Увійдіть знову!", actionCaption: "Увійти знову",
                                action: () => {
                                    setUserData(undefined);
                                    sessionStorage.clear()
                                }
                            })
                            return
                        }
                        setAlertData({
                            delay: 0.9, show: true, message: data.message, actionCaption: "Зрозуміло", action: () => {
                                SERVER("Оновлення даних", "GET", "auth/get-info", "application/json", "", getCookie("userToken")).then(data => {
                                    console.log("getting data res", data)
                                    if (data.errorMessage?.toLowerCase().includes("token")) {
                                        setAlertData({
                                            delay: 0.9, show: true, message: "Схоже термін дії вашого входу минув. Увійдіть знову!", actionCaption: "Увійти знову",
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
                (!pending && storage.current) ?
                    <article className={`Ticket Ticket_${status}`}>
                        <div className="Ticket__locations">
                            <div className="Ticket__group Ticket__group_location">
                                <div className="Ticket__info_bold Ticket__info">{new Date(from.arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                                <div className="Ticket__info">{from.country} - {from.city} <br />({from.location.caption})</div>
                            </div>
                            <div className="Ticket__group Ticket__group_arrow">
                                <div className="Ticket__sign">
                                    <img src={rightIcon} height={20} alt="->" />
                                </div>
                            </div>
                            <div className="Ticket__group Ticket__group_location">
                                <div className="Ticket__info_bold Ticket__info">{new Date(to.arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                                <div className="Ticket__info">{to.country} - {to.city} <br />({to.location.caption})</div>
                            </div>
                        </div>
                        <div className="Ticket__group">
                            <div className="Ticket__info_bigBold">{formatNumberWithSpaces((data.passangers.filter(item => item.age === "adult").length * (to.price.adult - from.price.adult)) + (data.passangers.filter(item => item.age === "child").length * (to.price.child - from.price.child)))} грн</div>
                            <div className="Ticket__info Ticket__info_small"> Дорослий: {data.passangers.filter(item => item.age === "adult").length}, Дитячий: {data.passangers.filter(item => item.age === "child").length}</div>
                        </div>
                        <button onClick={status === "active" ? handleRemoveBooking : () => { }} disabled={status !== "active"} className="Ticket__action">{status === "canceled" ? "Скасовано" : status === "done" ? "Виконано" : status === "active" ? "Скасувати" : "Помилка"}</button>
                    </article>
                    : <BuiltInLoader />
            }
        </>
    )
}

export default Ticket