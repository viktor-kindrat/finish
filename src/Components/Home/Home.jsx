import { useState } from "react";
import "./Styles/Home.css";
import mainImage from "./Images/main.webp";
import switchIcon from "./SVG/switch.svg";
import placeIcon from "./SVG/place.svg";
import dateIcon from "./SVG/date.svg";
import selectIcon from "./SVG/select.svg";

function Home() {
    const places = {
        Ukraine: ["Kyiv", "Lviv", "Odesa"],
        France: ["Paris"],
        Italy: ["Place 1", "Place 2", "Place 3"],
    };

    const [from, setFrom] = useState("Початкове місце");
    const [to, setTo] = useState("Місце прибуття");

    console.log(from, to)
    return (
        <section className="Home">
            <div className="Home__head-group">
                <img className="Home__bgImage" src={mainImage} alt="main" />
                <h1 className="Home__headline">Бронювання білетів</h1>
            </div>
            <div className="Home__booking">
                <div className="Home__booking-place">
                    <div className="Home__booking-place-item">
                        <p className="Home__booking-caption">Звідки</p>
                        <select
                            style={{ backgroundImage: `url(${placeIcon}), url(${selectIcon})` }}
                            name="from"
                            id="Home__from-select"
                            className="Home__booking-select"
                            onChange={(e) => setFrom({ place: e.target.value.split("-")[1], country: e.target.value.split("-")[0] })}
                        >
                            <option value="Початкове місце">Початкове місце</option>
                            {Object.keys(places).map((placeGroup) => (
                                <optgroup key={placeGroup} label={placeGroup}>
                                    {places[placeGroup].map((place) => (
                                        <option key={place} value={`${placeGroup}-${place}`}>
                                            {`${placeGroup} - ${place}`}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <button className="Home__booking-places-switch">
                        <img src={switchIcon} alt="switch" className="Home__booking-switch-icon" />
                    </button>
                    <div className="Home__booking-place-item">
                        <p className="Home__booking-caption">Куди</p>
                        <select
                            disabled={from === "Початкове місце"}
                            style={{ backgroundImage: `url(${placeIcon}), url(${selectIcon})` }}
                            name="to"
                            id="Home__to-select"
                            className="Home__booking-select"
                            onChange={(e) => setTo({ place: e.target.value.split("-")[1], country: e.target.value.split("-")[0] })}
                        >
                            <option value="Місце прибуття">Місце прибуття</option>
                            {Object.keys(places).map((placeGroup) => {
                                console.log(placeGroup, from.country)
                                if (placeGroup !== from.country) {
                                    return (
                                        <optgroup key={placeGroup} label={placeGroup}>
                                            {places[placeGroup].map((place) => (
                                                <option key={place} value={`${placeGroup}-${place}`}>
                                                    {`${placeGroup} - ${place}`}
                                                </option>
                                            ))}
                                        </optgroup>
                                    )
                                } else {
                                    return ""
                                }
                            })}
                        </select>
                    </div>
                </div>
                <div className="Home__booking-group">
                    <p className="Home__booking-caption">Відправлення</p>
                    <input style={{ backgroundImage: `url(${dateIcon})` }} type="date" className="Home__booking-date" />
                </div>
            </div>
        </section>
    );
}

export default Home;
