import closeIcon from "./SVG/close.svg";
import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import hrefContext from "../../Context/ServerHostnameContext";

import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader";


function BackControlItem({ data, getCookie, setAlertData, setUserData, SERVER, trigger, setTrigger }) {
    let [pending, setPending] = useState(true);
    let [error, setError] = useState(undefined)
    let storage = useRef(undefined);
    let server = useContext(hrefContext).server;

    let go = useNavigate()

    useEffect(() => {
        fetch(`${server}book/get-trip-info/?tripId=${data.tripId}`, { headers: { Authorization: `Baerer ${getCookie("userToken")}` } })
            .then(res => res.json())
            .then(data => {
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
                // TRANSLATION UPDATE: "Дані отримано" -> "Data received"
                if (data.message === "Data received") {
                    storage.current = data.data;
                    setPending(false)
                } else {
                    storage.current = data.message;
                    setPending(false)
                    setError({ msg: "It seems there is an issue with this refund. The trip associated with this refund was likely deleted! Click the cross to remove this request." })
                }
            })
            .catch(e => console.log(e))
    }, [data.tripId, getCookie, go, server, setAlertData, setUserData])

    let handleRemoveCancelation = () => {
        SERVER("Deletion...", "POST", "book/admin/remove-cancelation", "application/json", { id: data._id }, getCookie("userToken"))
            .then(data => {
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
                setAlertData({ delay: 0.9, show: true, message: "Deleted successfully", actionCaption: "OK", action: () => { } })
                setTrigger(!trigger);
            })
    }

    let from = data.passangers[0]?.userDetails.from
    let to = data.passangers[0]?.userDetails.to
    
    return (
        <div className="BackControll__item">
            {
                !error ? !pending && storage.current ? <>
                    <div className="BackControll__item-head">{storage.current.name} <button onClick={handleRemoveCancelation} className="BackControll__item-close-btn"><img src={closeIcon} alt="close" /></button></div>
                    <div className="BackControll__item-content">
                        <div className="BackControll__item-content-row">
                            <div className="BackControll__item-column">
                                <div className="BackControll__item-info BackControll__item-info_bigBold">{from?.city}</div>
                                <div className="BackControll__item-info">{
                                    new Date(storage.current.stations.filter(item => item.city === from?.city && item.country === from?.country)[0].arrivalDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })
                                }</div>
                                <div className="BackControll__item-info">{
                                    new Date(storage.current.stations.filter(item => item.city === from?.city && item.country === from?.country)[0].arrivalDate).toLocaleDateString("en-GB")
                                }</div>
                            </div>
                            <div className="BackControll__item-sign">&gt;</div>
                            <div className="BackControll__item-column">
                                <div className="BackControll__item-info BackControll__item-info_bigBold">{to?.city}</div>
                                <div className="BackControll__item-info">{
                                    new Date(storage.current.stations.filter(item => item.city === to?.city && item.country === to?.country)[0].arrivalDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })
                                }</div>
                                <div className="BackControll__item-info">{
                                    new Date(storage.current.stations.filter(item => item.city === to?.city && item.country === to?.country)[0].arrivalDate).toLocaleDateString("en-GB")
                                }</div>
                            </div>
                            <div className="BackControll__item-column">
                                <div className="BackControll__item-info">Seat:</div>
                                <div className="BackControll__item-info">{data.passangers.map((item, index) => `${item.placeNumber}${data.passangers.length - 1 === index ? "" : ","} `)}</div>
                            </div>
                        </div>
                        <h3 className="BackControll__item-headline">{data.passangers.filter(item => item.isInitiator)[0].userDetails.name} {data.passangers.filter(item => item.isInitiator)[0].userDetails.surname}</h3>
                        <p className="BackControll__item-subheadline">{data.passangers.filter(item => item.isInitiator)[0].initiatorContacts.phone}</p>
                    </div>
                </> : <BuiltInLoader /> : <>
                    <div className="BackControll__item-head">Error <button onClick={handleRemoveCancelation} className="BackControll__item-close-btn"><img src={closeIcon} alt="close" /></button></div>
                    <div className="BackControll__item-content">
                        {error.msg}
                    </div>
                </>
            }
        </div>
    )
}

export default BackControlItem