import "./Styles/TripsControll.css"
import plusIcon from "./SVG/plus.svg"

import { useState, useEffect, useRef, useContext } from "react"

import URLContext from "../../Context/ServerHostnameContext"

import TripCard from '../TripCard/TripCard'
import TripEditor from "../TripEditor/TripEditor"
import ViewTrip from "../ViewTrip/ViewTrip"
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

let emptyEditorData = {
    isNew: true,
    phoneNumber: "",
    driver: "",
    name: "",
    stations: [{
        id: 0,
        country: "",
        city: "",
        location: {
            caption: "",
            longitude: "",
            latitude: ""
        },
        arrivalDate: "",
        price: {
            adult: "0",
            child: "0"
        },
    }, {
        id: 1,
        country: "",
        city: "",
        location: {
            caption: "",
            longitude: "",
            latitude: ""
        },
        arrivalDate: "",
        price: {
            adult: "",
            child: ""
        },
    }, {
        id: 2,
        country: "",
        city: "",
        location: {
            caption: "",
            longitude: "",
            latitude: ""
        },
        arrivalDate: "",
        price: {
            adult: "",
            child: ""
        },
    },],
    places: []
}

function TripsControll({ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let [editorOpened, setEditorOpened] = useState(false);
    let [editorData, setEditorData] = useState(undefined);

    let [viewOpened, setViewOpened] = useState(false);
    let [viewData, setViewData] = useState(undefined);

    let server = useContext(URLContext).server
    let [trigger, setTrigger] = useState(false)

    let [pending, setPending] = useState(true);
    let trips = useRef(undefined);

    useEffect(() => {
        setPending(true);
        fetch(`${server}book/admin/get-all-trips`, { headers: { Authorization: `Baerer ${getCookie("userToken")}` } })
            .then(res => res.json())
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
                    setAlertData({ delay: 0.9, show: true, message: "Схоже деякі поля залишились порожніми, або заповнені некоректно! Перевірте все ще раз та спробуйте знову.", actionCaption: "закрити", action: () => { } })
                    return
                }
                if (data.data) {
                    trips.current = data.data;
                    setPending(false)
                }

            })
            .catch(e => {
                console.log(e)
            })
    }, [trigger, server, setUserData, getCookie, setAlertData])


    let handleNewTrip = () => {
        setEditorData(emptyEditorData)
        setEditorOpened(true)
    }

    return (
        <section className="TripsControll">
            {
                !editorOpened && !viewOpened ? <>
                    <div className="TripsControll__head">
                        <div className="TripsControll__headline">Рейси</div>
                        {(!pending && trips.current) ? <button onClick={handleNewTrip} className="TripsControll__head-btn">Додати рейс <img height={14} src={plusIcon} alt="" /></button> : ""}
                    </div>
                    <div className="TripsControll__container">
                        {
                            (!pending && trips.current) ? trips.current.map((trip, index) =>
                                <TripCard key={index} data={trip} {...{ setModalData, setUserData, setAlertData, trigger, setTrigger, SERVER, setCookie, getCookie, setEditorData, editorOpened, setEditorOpened, viewOpened, setViewOpened, setViewData }} />
                            ) : <BuiltInLoader />
                        }
                    </div>
                </> : editorOpened ? <TripEditor {...{ alertData, setUserData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, emptyEditorData, editorOpened, setEditorOpened, editorData, setEditorData }} />
                    : viewOpened ? <ViewTrip {...{ alertData, setUserData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, viewData, setViewData, viewOpened, setViewOpened }} /> : "ERROR"
            }
        </section>
    )
}

export default TripsControll