import { useState } from "react";
import "./Styles/Home.css";
import mainImage from "./Images/main.webp";
import switchIcon from "./SVG/switch.svg";
import placeIcon from "./SVG/place.svg";
import dateIcon from "./SVG/date.svg";
import selectIcon from "./SVG/select.svg";
import addIcon from "./SVG/add.svg";
import removeIcon from "./SVG/remove.svg"
const places = {
    "Україна": ["Київ", "Чернівці", "Коломия", "Франківськ", "Стрий", "Львів", "Мукачево"],
    "Франція": ["Канни", "Ніцці", "Антіб", "Монако", "Ментон"],
    "Італія": ["Санремо", "Імперія", "Аласіо", "Альбенга", "Вентимілія неділя", "Лоано", "Петра", "Фінале", "Савона", "Верона", "Мілан"],
};

function Home() {
    let [peoples, setPeoples] = useState({ adults: 1, children: 0 })
    let [from, setFrom] = useState({ country: "Початкове місце", place: "" });
    let [to, setTo] = useState({ country: "Місце прибуття", place: "" });

    let handleSwitch = async () => {
        await setTo(from)
        setFrom(to)
    }

    let handleIncrement = (e) => {
        let type = e.target.parentElement.dataset.type;
        if (type === "children") {
            setPeoples({ ...peoples, children: peoples.children + 1 })
        } else {
            setPeoples({ ...peoples, adults: peoples.adults + 1 })
        }
    }

    let handleDecrement = (e) => {
        let type = e.target.parentElement.dataset.type;
        if (type === "children") {
            if (peoples.children > 0) {
                setPeoples({ ...peoples, children: peoples.children - 1 })
            }
        } else {
            if (peoples.adults > 1) {
                setPeoples({ ...peoples, adults: peoples.adults - 1 })
            }
        }
    }

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
                            value={`${from.country}-${from.place}`}
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
                    <button onClick={((from !== "Початкове місце" && from.country !== "Початкове місце") && (to.country !== "Місце прибуття" && to !== "Місце прибуття")) ? handleSwitch : () => { return false }} className="Home__booking-places-switch">
                        <img src={switchIcon} alt="switch" className="Home__booking-switch-icon" />
                    </button>
                    <div className="Home__booking-place-item">
                        <p className="Home__booking-caption">Куди</p>
                        <select
                            disabled={from === "Початкове місце" || from.country === "Початкове місце"}
                            style={{ backgroundImage: `url(${placeIcon}), url(${selectIcon})` }}
                            name="to"
                            id="Home__to-select"
                            className="Home__booking-select"
                            onChange={(e) => setTo({ place: e.target.value.split("-")[1], country: e.target.value.split("-")[0] })}
                        >
                            <option value="Місце прибуття">Місце прибуття</option>
                            {Object.keys(places).map((placeGroup) => {
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
                <div className="Home__booking-group">
                    <p className="Home__booking-caption">Пасажири</p>
                    <div className="Home__booking-passangers-select">
                        <div className="Home__booking-select-label">{`${peoples.adults} дорослий ${peoples.children !== 0 ? `, ${peoples.children} дитячий` : ""}`} <button className="Home__booking-select-open-btn"><img src={selectIcon} alt="select" /></button></div>
                        <div className="Home__booking-select-options">
                            <div className="Home__booking-select-option" data-type="adults">
                                <button className="Home__booking-select-btn" onClick={handleDecrement}>
                                    <img src={removeIcon} alt="-" />
                                </button>
                                <p className="Home__booking-option-label">{peoples.adults} дорослий</p>
                                <button className="Home__booking-select-btn" onClick={handleIncrement}>
                                    <img src={addIcon} alt="+" />
                                </button>
                            </div>
                            <div className="Home__booking-select-option" data-type="children">
                                <button className="Home__booking-select-btn" onClick={handleDecrement}>
                                    <img src={removeIcon} alt="-" />
                                </button>
                                <p className="Home__booking-option-label">{peoples.children} дитячий</p>
                                <button className="Home__booking-select-btn" onClick={handleIncrement}>
                                    <img src={addIcon} alt="+" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
