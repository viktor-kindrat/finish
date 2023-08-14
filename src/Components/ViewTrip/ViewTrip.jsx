import "./Styles/ViewTrip.css"

import Autobus from "../Autobus/Autobus"
import { useState, useEffect } from "react";

function ViewTrip({ trigger, setTrigger, alertData, setUserData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, viewData, setViewData, viewOpened, setViewOpened }) {
    let [data, setData] = useState(viewData);
    let [clickTrigger, setClickTrigger] = useState(false);
    let [moreData, setMoreData] = useState(undefined)

    useEffect(() => {
        let searchResult = data.places.filter(item => parseInt(item.placeNumber) === parseInt(clickTrigger))
        if (searchResult.length === 1) {
            setMoreData(searchResult[0])
        } else {
            setMoreData(undefined)
        }
    }, [clickTrigger, setMoreData, data])

    let handleBook = (e) => {
        let selected = document.querySelector(".Autobus__place_selected")?.innerText;
        if (selected) {
            let tripId = viewData._id;
            SERVER("Бронюємо", "POST", "book/admin/book-place", "application/json", {
                tripId: tripId, place: selected
            }, getCookie("userToken"))
                .then(data => {
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
                    if (data.errorMessage?.toLowerCase().includes("validation")) {
                        setAlertData({ delay: 0.9, show: true, message: "Помилка валідації, схоже ви обрали щось не те.", actionCaption: "закрити", action: () => { } })
                        return
                    }
                    setAlertData({
                        delay: 0.9,
                        show: true,
                        message: data.message,
                        actionCaption: "закрити",
                        action: () => {
                            setData(data.data)
                            let searchResult = data.data.places.filter(item => parseInt(item.placeNumber) === parseInt(clickTrigger))
                            if (searchResult.length === 1) {
                                setMoreData(searchResult[0])
                            } else {
                                setMoreData(undefined)
                                console.log("new")
                            }
                        }
                    })
                })
        }
    }
    let handleRemove = (e) => {
        let selected = document.querySelector(".Autobus__place_selected")?.innerText;
        if (selected) {
            let tripId = viewData._id;
            SERVER("Скасовуємо бронювання", "POST", "book/admin/cancel-book-place", "application/json", {
                tripId: tripId, place: selected
            }, getCookie("userToken"))
                .then(data => {
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
                    if (data.errorMessage?.toLowerCase().includes("validation")) {
                        setAlertData({ delay: 0.9, show: true, message: "Помилка валідації, схоже ви обрали щось не те.", actionCaption: "закрити", action: () => { } })
                        return
                    }
                    if (data.message === 'Скасовано успішно') {
                        setAlertData({
                            delay: 0.9,
                            show: true,
                            message: data.message,
                            actionCaption: "закрити",
                            action: () => {
                                setData(data.data)
                            }
                        })
                    } else {
                        setAlertData({
                            delay: 0.9,
                            show: true,
                            message: data.message,
                            actionCaption: "закрити",
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
    return (
        <div className="ViewTrip">
            <button onClick={backHandler} className="ViewTrip__btn">&#8592; Назад</button>
            <Autobus type="ADMIN" places={data.places} {...{ clickTrigger, setClickTrigger }} />
            <div className="ViewTrip__actions">
                <button className="ViewTrip__action ViewTrip__action_green" onClick={handleBook}>Бронювати</button>
                <button className="ViewTrip__action ViewTrip__action_red" onClick={handleRemove}>Звільнити</button>
            </div>
            {
                (moreData) ? <>
                    <h2 className="ViewTrip__headline">Заброньовано</h2>
                    <div className="ViewTrip__records">
                        <div className={`ViewTrip__record ${moreData.isInitiator ? `ViewTrip__record_initiator` : ""}`}>
                            <div className="ViewTrip__record-head">місце {moreData.placeNumber}</div>
                            <div className="ViewTrip__record-body">
                                <h3 className="ViewTrip__record-headline">{moreData.userDetails.name} {moreData.userDetails.surname}</h3>
                                <p className="ViewTrip__record-info">{normalizeInput(moreData.initiatorContacts.phone)}</p>

                                {
                                    data.places.map(item => {
                                        if (item.invitatorId === moreData.invitatorId && moreData.placeNumber !== item.placeNumber) {
                                            return (
                                                <div className={item.isInitiator ? `ViewTrip__sub-passanger ViewTrip__sub-passanger_initiator` : "ViewTrip__sub-passanger"}>
                                                    <div className="ViewTrip__record-head">Місце {item.placeNumber}</div>
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