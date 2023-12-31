import "./Styles/ViewTrip.css"

import Autobus from "../Autobus/Autobus"
import InputModal from "../InputModal/InputModal";

import { useState, useEffect, useCallback } from "react";

import clearIcon from "./SVG/clear.svg"


function ViewTrip({ trigger, setTrigger, alertData, setUserData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, viewData, setViewData, viewOpened, setViewOpened }) {
    let defPassForm = {
        name: "Адміністратором",
        surname: "Броньовано",
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
                                setViewData(data.data)
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

    const removeAction = () => {
        SERVER("Видаляємо", "POST", "book/admin/cancel-all-booking", "application/json", { tripId: viewData._id }, getCookie("userToken"))
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
                if (data.data) {
                    setViewData(data.data)
                    setData(data.data)
                    setPassangerForm(defPassForm)
                }
                setAlertData({ delay: 0.9, show: true, message: data.message, actionCaption: "Зрозуміло", action: () => { } })
            })
    }

    const removeAllHandler = () => {
        setModalData({
            delay: 0, show: true,
            message: `Ви впевнені що хочете вилучити усіх пасажирів рейсу? Ця дія не відворотня, натискайте "Так" тільки якщо впевнені у своїх діях`,
            confirmCaption: "Так",
            rejectCaption: "Ні",
            confirmAction: removeAction,
            rejectAction: () => { },
        })
    }


    const bookPlace = () => {
        let selected = document.querySelector(".Autobus__place_selected")?.innerText;
        let formFilled = areAllFieldsDefined(passangerForm);
        if (selected && formFilled) {
            let tripId = viewData._id;
            SERVER("Бронюємо", "POST", "book/admin/book-place", "application/json", {
                tripId: tripId, place: selected, ...passangerForm
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
            setAlertData({ delay: 0, show: true, message: "Заповніть всі поля і впевніться що попередньо було вибрано місце на карті автобуса", actionCaption: "Зрозуміло", action: () => { } })
        }
    }
    return (
        <div className="ViewTrip">
            <InputModal {...{ passangerForm, setPassangerForm, bookPlace, setInputModalShow }} show={inputModalShow} />
            <button onClick={backHandler} className="ViewTrip__btn">&#8592; Назад</button>
            <button onClick={removeAllHandler} className="ViewTrip__btn ViewTrip__btn_filled"><img src={clearIcon} alt="clear" /> Очистити бронювання</button>
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
                                    data.places.map((item, index) => {
                                        if (item.invitatorId === moreData.invitatorId && moreData.placeNumber !== item.placeNumber) {
                                            return (
                                                <div key={index} className={item.isInitiator ? `ViewTrip__sub-passanger ViewTrip__sub-passanger_initiator` : "ViewTrip__sub-passanger"}>
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