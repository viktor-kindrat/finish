import MapComponent from "../UI/MapComponent/MapComponent";
import { useEffect, useState, useContext } from "react";
import { gsap } from "gsap";
import moment from "moment"

import mapIcon from "./SVG/mapicon.svg"
import APIkeyContext from "../../Context/APIkeysContext";

function TripEditorCard({ data, finish, editorData, setEditorData }) {
    let [showCard, setShowCard] = useState(false);

    useEffect(() => {
        if (showCard) {
            let tl = gsap.timeline()
            tl.to(".TripEditor__map", {opacity: 0, duration: 0.2})
            tl.set(`.TripEditor__map`, { display: "none" })
            tl.set(`.TripEditor__map-${data.id}`, { display: "flex" })
            tl.to(`.TripEditor__map-${data.id}`, { opacity: 1, duration: 0.3 })
        } else {
            let tl = gsap.timeline()
            tl.to(`.TripEditor__map-${data.id}`, { opacity: 0, duration: 0.3 })
            tl.set(`.TripEditor__map-${data.id}`, { display: "none" })
        }
    }, [showCard, data.id])

    let toggleCard = (e) => {
        setShowCard(!showCard)
    }

    let handleChange = (e) => {
        let newData = { ...data };
        let field = e.target.name.split(".");
        if (field.length === 1) {
            newData[field[0]] = e.target.value
        } else if (field.length === 2) {
            newData[field[0]] = { ...newData[field[0]], [field[1]]: e.target.value };
        }
        let newEditorData = { ...editorData };
        newEditorData.stations[newData.id] = newData;
        setEditorData(newEditorData)
        console.log(newEditorData)
    }

    const handleMarkerChange = (e) => {
        let newStationData = {...data};
        newStationData.location = {
            caption: newStationData.location.caption,
            longitude: e.lat,
            latitude: e.lng
        }
        let newEditorData = {...editorData};
        newEditorData.stations[newStationData.id] = newStationData;
        setEditorData(newEditorData)
        console.log(newEditorData)
    };

    let arrivalDate = (data.arrivalDate) ? new Date(data.arrivalDate).toISOString().slice(0, 16) : ""
    return (
        <div className="TripEditor__card">
            <h2 className="TripEditor__headline">{finish ? "Прибуття" : data.id === 0 ? "Відправлення" : `${data.id} зупинка`}</h2>
            <div className="TripEditor__card-content">
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Країна </div>
                    <input name="country" onChange={handleChange} data-field="country" value={data.country} type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Місто </div>
                    <input name="city" onChange={handleChange} data-field="city" value={data.city} type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Локація (у полі введіть назву місця на мапі виберіть розташування) </div>
                    <div className="TripEditor__input-row">
                        <input name="location.caption" onChange={handleChange} data-field="location" value={data.location.caption} type="text" className="TripEditor__input" />
                        <button onClick={toggleCard} className="TripEditor__location-btn"><img src={mapIcon} alt="Додати локацію на мапі" /></button>
                    </div>
                    <div className={`TripEditor__map TripEditor__map-${data.id}`}>
                        <MapComponent stationId={data.id} language="uk" apiKey={useContext(APIkeyContext).googleMaps} handleMarkerChange={handleMarkerChange} />
                    </div>
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Час та Дата {data.id === 0 ? "відправлення" : "прибуття"} </div>
                    <input name="arrivalDate" onChange={handleChange} data-field="arrivalDate" value={moment(new Date(data.arrivalDate)).format('YYYY-MM-DDTHH:mm')} type="datetime-local" className="TripEditor__input" />
                </div>
                {
                    data.id !== 0 ? <>
                        <div className="TripEditor__input-conatiner">
                            <div className="TripEditor__input-label">Вартість дорослий </div>
                            <input name="price.adult" onChange={handleChange} data-field="adultPrice" value={data.price.adult} type="number" className="TripEditor__input" />
                        </div>
                        <div className="TripEditor__input-conatiner">
                            <div className="TripEditor__input-label">Вартість дитячий </div>
                            <input name="price.child" onChange={handleChange} data-field="childPrice" value={data.price.child} type="number" className="TripEditor__input" />
                        </div>
                    </> : ""
                }
            </div>
        </div>
    )
}

export default TripEditorCard