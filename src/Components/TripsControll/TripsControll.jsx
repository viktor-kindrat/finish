import "./Styles/TripsControll.css"
import plusIcon from "./SVG/plus.svg"

import { useState } from "react"

import TripCard from '../TripCard/TripCard'
import TripEditor from "../TripEditor/TripEditor"
import ViewTrip from "../ViewTrip/ViewTrip"

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
            longitude: 30.519707783342987,
            latitude: 50.40651654819113
        },
        arrivalDate: "",
        price: {
            adult: 0,
            child: 0
        },
    }, {
        id: 1,
        country: "",
        city: "",
        location: {
            caption: "",
            longitude: 30.519707783342987,
            latitude: 50.40651654819113
        },
        arrivalDate: "",
        price: {
            adult: 0,
            child: 0
        },
    }, {
        id: 2,
        country: "",
        city: "",
        location: {
            caption: "",
            longitude: 30.519707783342987,
            latitude: 50.40651654819113
        },
        arrivalDate: "",
        price: {
            adult: 0,
            child: 0
        },
    },],
    places: []
}

function TripsControll({ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let [editorOpened, setEditorOpened] = useState(false);
    let [editorData, setEditorData] = useState(undefined);
    let [viewOpened, setViewOpened] = useState(false);

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
                        <button onClick={handleNewTrip} className="TripsControll__head-btn">Додати рейс <img height={14} src={plusIcon} alt="" /></button>
                    </div>
                    <div className="TripsControll__container">
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                    </div>
                </> : editorOpened ? <TripEditor {...{ editorOpened, setEditorOpened, editorData, setEditorData }} /> : viewOpened ? <ViewTrip {...{ viewOpened, setViewOpened }} /> : "ERROR"
            }
        </section>
    )
}

export default TripsControll