import "./Styles/ViewTrip.css"

import Autobus from "../Autobus/Autobus"
import InputModal from "../InputModal/InputModal";

import { useState, useEffect, useCallback } from "react";

import clearIcon from "./SVG/clear.svg"


function ViewTrip({ trigger, setTrigger, alertData, setUserData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, viewData, setViewData, viewOpened, setViewOpened }) {
    let defPassForm = {
        name: "Admin",
        surname: "Booked",
        email: JSON.parse(sessionStorage.getItem("userData")).email,
        phoneNumber: JSON.parse(sessionStorage.getItem("userData")).phoneNumber
    }
    let [data, setData] = useState(viewData);
    let [clickTrigger, setClickTrigger] = useState(false);
    let [moreData, setMoreData] = useState(undefined);

    let [passangerForm, setPassangerForm] = useState(defPassForm);

    let [inputModalShow, setInputModalShow] = useState(false)

    useEffect(() => {
        let searchResult = data.places.filter(item => parseInt(item.placeNumber) === parseInt(clickTrigger))
        if (searchResult.length === 1) {
            setMoreData(searchResult[0])
        } else {
            setMoreData(undefined)
        }
    }, [clickTrigger, setMoreData, data])

    let areAllFieldsDefined = useCallback((obj) => {
        for (const prop in obj) {
            if (obj[prop] === undefined || obj[prop] === "") {
                return false;
            }
            if (typeof obj[prop] === 'object' && !areAllFieldsDefined(obj[prop])) {
                return false;
            }
        }
        return true;
    }, []);

    let handleBook = (e) => {
        setInputModalShow(true)
    }
    let handleRemove = (e) => {
        let selected = document.querySelector(".Autobus__place_selected")?.innerText;
        if (selected) {
            let tripId = viewData._id;
            SERVER("Cancelling seat booking...", "POST", "book/admin/cancel-book-place", "application/json", {
                tripId: tripId, place: selected
            }, getCookie("userToken"))
                .then(data => {
                    if (data.errorMessage?.toLowerCase().includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in",
                            action: () => {
                                setUserData(undefined);
                                sessionStorage.clear()
                            }
                        })
                        return
                    }
                    if (data.errorMessage?.toLowerCase().includes("validation")) {
                        setAlertData({ delay: 0.9, show: true, message: "Validation error, selection seems invalid.", actionCaption: "Close", action: () => { } })
                        return
                    }
                    if (data.message === 'Скасовано успішно') {
                        setAlertData({
                            delay: 0.9,
                            show: true,
                            message: "Cancelled successfully",
                            actionCaption: "Close",
                            action: () => {
                                setData(data.data)
                                setViewData(data.data)
                            }
                        })
                    } else {
                        setAlertData({
                            delay: 0.9,
                            show: true,
                            message: data.message,
                            actionCaption: "Close",
                            action: () => { }
                        })
                    }
                })
        }
    }

    const normalizeInput = (value) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 6) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 9) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 11) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };

    const backHandler = () => {
        setTrigger(!trigger)
        setViewOpened(false)
    }

    const removeAction = () => {
        SERVER("Deleting...", "POST", "book/admin/cancel-all-booking", "application/json", { tripId: viewData._id }, getCookie("userToken"))
            .then(data => {
                if (data.errorMessage?.toLowerCase().includes("token")) {
                    setAlertData({
                        delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in",
                        action: () => {
                            setUserData(undefined);
                            sessionStorage.clear()
                        }
                    })
                    return
                }
                if (data.errorMessage?.toLowerCase().includes("validation")) {
                    setAlertData({ delay: 0.9, show: true, message: "Validation error, selection seems invalid.", actionCaption: "Close", action: () => { } })
                    return
                }
                if (data.data) {
                    setViewData(data.data)
                    setData(data.data)
                    setPassangerForm(defPassForm)
                }
                setAlertData({ delay: 0.9, show: true, message: data.message, actionCaption: "Got it", action: () => { } })
            })
    }

    const removeAllHandler = () => {
        setModalData({
            delay: 0, show: true,
            message: `Are you sure you want to remove all passengers? This action is irreversible, press "Yes" only if you are sure.`,
            confirmCaption: "Yes",
            rejectCaption: "No",
            confirmAction: removeAction,
            rejectAction: () => { },
        })
    }


    const bookPlace = () => {
        let selected = document.querySelector(".Autobus__place_selected")?.innerText;
        let formFilled = areAllFieldsDefined(passangerForm);
        if (selected && formFilled) {
            let tripId = viewData._id;
            SERVER("Booking...", "POST", "book/admin/book-place", "application/json", {
                tripId: tripId, place: selected, ...passangerForm
            }, getCookie("userToken"))
                .then(data => {
                    if (data.errorMessage?.toLowerCase().includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in",
                            action: () => {
                                setUserData(undefined);
                                sessionStorage.clear()
                            }
                        })
                        return
                    }
                    if (data.errorMessage?.toLowerCase().includes("validation")) {
                        setAlertData({ delay: 0.9, show: true, message: "Validation error, selection seems invalid.", actionCaption: "Close", action: () => { } })
                        return
                    }
                    setAlertData({
                        delay: 0.9,
                        show: true,
                        message: data.message,
                        actionCaption: "Close",
                        action: () => {
                            setInputModalShow(false)
                            setData(data.data)
                            setViewData(data.data)
                            setPassangerForm(defPassForm)
                            let searchResult = data.data.places.filter(item => parseInt(item.placeNumber) === parseInt(clickTrigger))
                            if (searchResult.length === 1) {
                                setMoreData(searchResult[0])
                            } else {
                                setMoreData(undefined)
                            }
                        }
                    })
                })
        } else {
            setAlertData({ delay: 0, show: true, message: "Please fill in all fields and make sure a seat is selected on the bus map.", actionCaption: "Got it", action: () => { } })
        }
    }
    return (
        <div className="ViewTrip">
            <InputModal {...{ passangerForm, setPassangerForm, bookPlace, setInputModalShow }} show={inputModalShow} />
            <button onClick={backHandler} className="ViewTrip__btn">&#8592; Back</button>
            <button onClick={removeAllHandler} className="ViewTrip__btn ViewTrip__btn_filled"><img src={clearIcon} alt="clear" /> Clear bookings</button>
            <Autobus type="ADMIN" places={data.places} {...{ clickTrigger, setClickTrigger }} />
            <div className="ViewTrip__actions">
                <button className="ViewTrip__action ViewTrip__action_green" onClick={handleBook}>Book</button>
                <button className="ViewTrip__action ViewTrip__action_red" onClick={handleRemove}>Release</button>
            </div>
            {
                (moreData) ? <>
                    <h2 className="ViewTrip__headline">Booked</h2>
                    <div className="ViewTrip__records">
                        <div className={`ViewTrip__record ${moreData.isInitiator ? `ViewTrip__record_initiator` : ""}`}>
                            <div className="ViewTrip__record-head">Seat {moreData.placeNumber}</div>
                            <div className="ViewTrip__record-body">
                                <h3 className="ViewTrip__record-headline">{moreData.userDetails.name} {moreData.userDetails.surname}</h3>
                                <p className="ViewTrip__record-info">{normalizeInput(moreData.initiatorContacts.phone)}</p>

                                {
                                    data.places.map((item, index) => {
                                        if (item.invitatorId === moreData.invitatorId && moreData.placeNumber !== item.placeNumber) {
                                            return (
                                                <div key={index} className={item.isInitiator ? `ViewTrip__sub-passanger ViewTrip__sub-passanger_initiator` : "ViewTrip__sub-passanger"}>
                                                    <div className="ViewTrip__record-head">Seat {item.placeNumber}</div>
                                                    <div className="ViewTrip__record-body">
                                                        <h4 className="ViewTrip__record-headline">{item.userDetails.name} {item.userDetails.surname}</h4>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return ""
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </> : ""
            }
        </div>
    )
}

export default ViewTrip