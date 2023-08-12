import "./Styles/BookingMenu.css"

import PassangersList from "../PassangersList/PassangersList"
import PlacesSet from "../PlacesSet/PlacesSet"
import ContactsField from "../ContactsField/ContactsField"
import { useEffect, useState } from "react"

function BookingMenu({ id, data, request, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    let [passangers, setPassangers] = useState([])
    useEffect(() => {
        let newPassangers = [];
        for (let i = 0; i < request.passangers.adults; i++) {
            newPassangers.push({
                isInitiator: false,
                userDetails: {
                    name: "",
                    surname: "",
                    from: {
                        country: request.from.country,
                        city: request.from.place
                    },
                    to: {
                        country: request.to.country,
                        city: request.to.place
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
        for (let i = 0; i < request.passangers.children; i++) {
            newPassangers.push({
                isInitiator: false,
                userDetails: {
                    name: "",
                    surname: "",
                    from: {
                        country: request.from.country,
                        city: request.from.place
                    },
                    to: {
                        country: request.to.country,
                        city: request.to.place
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
    }, [setPassangers, request])
    return (
        <div className="BookingMenu" data-id={id}>
            <PassangersList {...{ data, request, passangers, setPassangers,userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }} />
            <PlacesSet places={data.places} />
            <ContactsField {...{passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER}} />
        </div>
    )
}

export default BookingMenu