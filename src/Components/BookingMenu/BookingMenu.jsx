import "./Styles/BookingMenu.css"

import PassangersList from "../PassangersList/PassangersList"
import PlacesSet from "../PlacesSet/PlacesSet"
import ContactsField from "../ContactsField/ContactsField"
import { useEffect, useState } from "react"

function BookingMenu({ id, data, searchingData, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    let [selected, setSelected] = useState([])
    let [passangers, setPassangers] = useState([]);
    let handlerOfsearchingData = searchingData;

    useEffect(() => {
        console.log("here", handlerOfsearchingData)
        let newPassangers = [];
        for (let i = 0; i < handlerOfsearchingData.passangers.adults; i++) {
            newPassangers.push({
                isInitiator: false,
                userDetails: {
                    name: "",
                    surname: "",
                    from: {
                        country: handlerOfsearchingData.from.country,
                        city: handlerOfsearchingData.from.place
                    },
                    to: {
                        country: handlerOfsearchingData.to.country,
                        city: handlerOfsearchingData.to.place
                    },
                },
                initiatorContacts: {
                    phone: "",
                    email: "",
                },
                invitatorId: "",
                age: "adult",
                placeNumber: "",
            })
        }
        for (let i = 0; i < handlerOfsearchingData.passangers.children; i++) {
            newPassangers.push({
                isInitiator: false,
                userDetails: {
                    name: "",
                    surname: "",
                    from: {
                        country: handlerOfsearchingData.from.country,
                        city: handlerOfsearchingData.from.place
                    },
                    to: {
                        country: handlerOfsearchingData.to.country,
                        city: handlerOfsearchingData.to.place
                    },
                },
                initiatorContacts: {
                    phone: "",
                    email: "",
                },
                invitatorId: "",
                age: "child",
                placeNumber: "",
            })
        }
        setPassangers(newPassangers)
    }, [setPassangers, handlerOfsearchingData])
    return (
        <div className="BookingMenu" data-id={id}>
            <PassangersList {...{ data, searchingData, passangers, setPassangers,userData, setUserData, getCookie, setCookie, SERVER }} />
            <PlacesSet count={searchingData.passangers.adults + searchingData.passangers.children} places={data.places} {...{selected, setSelected}} />
            <ContactsField {...{passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER, selected, setSelected}} />
        </div>
    )
}

export default BookingMenu