import { useEffect, useState } from "react"
import "./Styles/ContactsField.css"
import checkIcon from "./SVG/check.svg"

function ContactsField({ passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    let [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: ""
    })

    useEffect(() => {
        if (userData) {
            setData({ ...userData })
        }
    }, [userData, setData])

    useEffect(() => {
        if (userData) {
            let changes = passangers.map((item, index) => {
                return {
                    ...item,
                    isInitiator: index === 0,
                    initiatorContacts: {
                        phone: data.phoneNumber,
                        email: data.email
                    },
                    invitatorId: userData._id
                }
            })
            setPassangers(changes)
        }// eslint-disable-next-line 
    }, [data, setPassangers, userData])

    return (
        <div className="ContactsField">
            <h3 className="ContactsField__headline"> <span className="ContactsField__headline_number">3</span> Контакти</h3>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Ім'я</div>
                <input value={data.name} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Прізвище</div>
                <input value={data.surname} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">E-mail</div>
                <input value={data.email} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Номер телефону</div>
                <input value={data.phoneNumber} type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__checkbox-group" style={{ display: (userData) ? "none" : "flex" }}>
                <div className="ContactsField__checkbox-box-group">
                    <input className="ContactField__origin-checkbox" type="checkbox" id="ContactField-create-account" />
                    <label htmlFor="ContactField-create-account" className="ContactField__custom-checkbox"><img src={checkIcon} alt="check" /></label>
                </div>
                <div className="ContactsField__checkbox-label">Зарееструвати аккаунт </div>
            </div>
            <button className="ContactsField__btn">Забронювати</button>
        </div>
    )
}

export default ContactsField