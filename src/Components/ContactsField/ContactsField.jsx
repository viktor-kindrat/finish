import { useEffect, useState, useCallback } from "react"
import "./Styles/ContactsField.css"
import checkIcon from "./SVG/check.svg"

import { useNavigate } from "react-router-dom"

function ContactsField({ data, passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER, selected, setSelected }) {
    let [contact, setContact] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: ""
    })

    let go = useNavigate()

    useEffect(() => {
        if (userData) {
            setContact({ ...userData })
        }
    }, [userData, setContact])

    useEffect(() => {
        console.log("called")
        if (!userData) {
            setContact({
                ...contact,
                name: passangers[0]?.userDetails.name,
                surname: passangers[0]?.userDetails.surname,
            })
        }// eslint-disable-next-line
    }, [passangers, userData])

    let areAllFieldsDefined = useCallback((obj) => {
        for (const prop in obj) {
            if (obj[prop] === undefined || obj[prop] === "") {
                console.log(`this is ${prop} with key ${obj[prop]}`)
                return false;
            }
            if (typeof obj[prop] === 'object' && !areAllFieldsDefined(obj[prop])) {
                return false;
            }
        }
        return true;
    }, []);

    let booking = () => {
        let requestBody = {
            passangers: passangers,
            tripId: data._id
        }
        SERVER("Відбувається бронювання", "POST", "book/book-places", "application/json", requestBody, getCookie("userToken"))
            .then(data => {
                console.log(data)
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
                if (data.errorMessage?.toLowerCase().includes("validation")) {
                    setAlertData({ delay: 0.9, show: true, message: "Схоже деякі поля залишились порожніми, або заповнені некоректно! Перевірте все ще раз та спробуйте знову.", actionCaption: "закрити", action: () => { } })
                    return
                }
                setAlertData({
                    delay: 0.9, show: true, message: data.message, actionCaption: "ОК",
                    action: data.message === "Заброньовано успішно!" ? () => {
                        go("/account/tickets")
                    } : () => { }
                })
            })
    }

    let setPlaces = useCallback(() => {
        if (passangers.length === selected.length) {
            setPassangers(passangers.map((item, index) => {
                return {
                    ...item, placeNumber: selected[index]
                }
            }))
        }
    }, [passangers, selected, setPassangers])

    useEffect(() => {
        console.log("places ", selected)
        setPlaces() // eslint-disable-next-line
    }, [selected])

    let handleBookTicket = (e) => {
        console.log("handle booking", passangers, selected)
        if (userData) {
            let validation = (passangers.length === selected.length) && areAllFieldsDefined(passangers);
            if (validation) {
                booking()
            } else {
                console.log(passangers)
                setAlertData({
                    show: true,
                    delay: 0,
                    message: "Впевніться що було обрано всі місця та заповнено всі поля!",
                    actionCaption: "Добре",
                    action: () => { }
                })
            }
        } else {
            let validation = (passangers.length === selected.length) && areAllFieldsDefined(passangers) && areAllFieldsDefined(contact);
            if (validation) {
                console.log("valid", passangers)
            } else {
                console.log("invalid", passangers)
                setAlertData({
                    show: true,
                    delay: 0,
                    message: "Впевніться що було обрано всі місця та заповнено всі поля!",
                    actionCaption: "Добре",
                    action: () => { }
                })
            }
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

    let handleChange = (e) => {
        if (!userData) {
            if (e.target.name === "phoneNumber") {
                setContact({ ...contact, [e.target.name]: normalizeInput(e.target.value) })
            } else {
                setContact({ ...contact, [e.target.name]: e.target.value })
            }

            if (e.target.name === "phoneNumber" || e.target.name === "email") {
                setPassangers(passangers.map(el => {
                    if (el.userDetails.name === contact.name && el.userDetails.surname === contact.surname) {
                        if (e.target.name === "phoneNumber") {
                            return { ...el, isInitiator: true, initiatorContacts: { ...el.initiatorContacts, phone: e.target.value } }
                        } else {
                            return { ...el, isInitiator: true, initiatorContacts: { ...el.initiatorContacts, [e.target.name]: e.target.value } }
                        }
                    } else {
                        if (e.target.name === "phoneNumber") {
                            return { ...el, initiatorContacts: { ...el.initiatorContacts, phone: e.target.value } }
                        } else {
                            return { ...el, initiatorContacts: { ...el.initiatorContacts, [e.target.name]: e.target.value } }
                        }
                    }
                }))
            }
        }
    }


    return (
        <div className="ContactsField">
            <h3 className="ContactsField__headline"> <span className="ContactsField__headline_number">3</span> Контакти</h3>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Ім'я</div>
                <input onChange={handleChange} name="name" value={contact.name} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Прізвище</div>
                <input onChange={handleChange} name="surname" value={contact.surname} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">E-mail</div>
                <input onChange={handleChange} name="email" value={contact.email} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Номер телефону</div>
                <input onChange={handleChange} name="phoneNumber" value={contact.phoneNumber} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__checkbox-group" style={{ display: (userData) ? "none" : "flex" }}>
                <div className="ContactsField__checkbox-box-group">
                    <input className="ContactField__origin-checkbox" type="checkbox" id="ContactField-create-account" />
                    <label htmlFor="ContactField-create-account" className="ContactField__custom-checkbox"><img src={checkIcon} alt="check" /></label>
                </div>
                <div className="ContactsField__checkbox-label">Зарееструвати аккаунт </div>
            </div>
            <button onClick={handleBookTicket} className="ContactsField__btn">Забронювати</button>
        </div>
    )
}

export default ContactsField