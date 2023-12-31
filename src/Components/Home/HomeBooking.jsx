import 'react-datepicker/dist/react-datepicker.css';

import switchIcon from "./SVG/switch.svg";
import placeIcon from "./SVG/place.svg";
import dateIcon from "./SVG/date.svg";
import selectIcon from "./SVG/select.svg";
import addIcon from "./SVG/add.svg";
import removeIcon from "./SVG/remove.svg"

import { gsap } from "gsap";
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import DatePicker, { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk'; 

registerLocale('uk', uk);

function HomeBooking({ triggerSearch, setTriggerSearch, searchingData, setSearchingData, date, setDate, places, peoples, setPeoples, from, setFrom, to, setTo, passangerOpened, setPassangerOpened }) {
    let navigate = useNavigate();

    let handleOpenPassanger = (e) => {
        setPassangerOpened(!passangerOpened);
        let timeline = gsap.timeline();
        if (passangerOpened) {
            timeline.fromTo(".Home__booking-select-options", {
                opacity: 1
            }, {
                opacity: 0,
                duration: 0.3
            })
            timeline.set(".Home__booking-select-options", { display: "none" })
        } else {
            timeline.set(".Home__booking-select-options", { display: "flex", opacity: 0 })
            timeline.fromTo(".Home__booking-select-options", {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.3
            })
        }
    }

    let handleSwitch = useCallback(async () => {
        await setTo(from)
        setFrom(to)
    }, [setFrom, setTo, from, to])

    let handleIncrement = useCallback((e) => {
        let type = e.target.parentElement.dataset.type;
        if (type === "children") {
            setPeoples({ ...peoples, children: peoples.children + 1 })
        } else {
            setPeoples({ ...peoples, adults: peoples.adults + 1 })
        }
    }, [peoples, setPeoples])

    let handleDecrement = useCallback((e) => {
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
    }, [peoples, setPeoples])

    let searchHandler = useCallback((e) => {
        setSearchingData({
            from: from,
            to: to,
            arrivalDate: date,
            passangers: peoples
        })
        navigate("/search")
        setTriggerSearch(!triggerSearch)
    }, [setTriggerSearch, navigate, setSearchingData, date, from, peoples, to, triggerSearch])

    let passangersReadyHandler = useCallback(() => {
        setPassangerOpened(false)
        let timeline = gsap.timeline();
        timeline.fromTo(".Home__booking-select-options", {
            opacity: 1
        }, {
            opacity: 0,
            duration: 0.3
        })
        timeline.set(".Home__booking-select-options", { display: "none" })
    }, [setPassangerOpened])

    const getCurrentDate = () => {
        return new Date();
    };

    let passangersResetHandler = () => setPeoples({ adults: 1, children: 0 })
    return (
        <div className={"Home__booking" + (window.location.href.includes("/search") ? " Home__booking_full" : "")}>
            <div className="Home__booking-place">
                <div className="Home__booking-place-item">
                    <p className="Home__booking-caption">Звідки</p>
                    <select style={{ backgroundImage: `url(${placeIcon}), url(${selectIcon})` }} name="from" id="Home__from-select" className="Home__booking-select" onChange={(e) => setFrom({ place: e.target.value.split("-")[1], country: e.target.value.split("-")[0] })} value={`${from.country}-${from.place}`}>
                        <option value="Пункт відправлення" hidden>Пункт відправлення</option>
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
                <button onClick={((from !== "Пункт відправлення" && from.country !== "Пункт відправлення") && (to.country !== "Місце прибуття" && to !== "Місце прибуття")) ? handleSwitch : () => { return false }} className="Home__booking-places-switch">
                    <img src={switchIcon} alt="switch" className="Home__booking-switch-icon" />
                </button>
                <div className="Home__booking-place-item">
                    <p className="Home__booking-caption">Куди</p>
                    <select disabled={from === "Пункт відправлення" || from.country === "Пункт відправлення"} style={{ backgroundImage: `url(${placeIcon}), url(${selectIcon})` }} name="to" id="Home__to-select" className="Home__booking-select" onChange={(e) => setTo({ place: e.target.value.split("-")[1], country: e.target.value.split("-")[0] })}>
                        <option value="Місце прибуття" hidden>Місце прибуття</option>
                        {Object.keys(places).map((placeGroup) => {
                            if (from.country === "Україна") {
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
                            } else {
                                if (placeGroup === "Україна") {
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
                            }
                        })}
                    </select>
                </div>
            </div>
            <div className="Home__booking-group">
                <p className="Home__booking-caption">Відправлення</p>
                <div className="Home__booking-datepiacker-wrapper">
                    <DatePicker
                        id="myDateInput"
                        selected={date}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="дд.мм.рррр"
                        minDate={getCurrentDate()}
                        className="Home__booking-date"
                        onChange={(selectedDate) => setDate(selectedDate)}
                        customInput={
                            <input
                                type="text"
                                style={{ backgroundImage: `url(${dateIcon})`, paddingRight: '30px' }}
                                className="Home__booking-date"
                            />
                        }
                        popperModifiers={{
                            offset: {
                                enabled: true,
                                offset: '0, 10px', // Adjust the offset as needed to center vertically
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport', // Make sure the calendar stays within the viewport
                            },
                        }}
                        appendToBody={true}
                        portalId="home-select"
                        popperPlacement="top-start"
                        locale="uk"
                    />
                </div>
            </div>
            <div className="Home__booking-group" >
                <p className="Home__booking-caption" id='home-select'>Пасажири</p>
                <div className="Home__booking-passangers-select">
                    <div className="Home__booking-select-label" onClick={handleOpenPassanger}>{`${peoples.adults} дорослий ${peoples.children !== 0 ? `, ${peoples.children} дитячий` : ""}`} <button className="Home__booking-select-open-btn"><img src={selectIcon} alt="select" /></button></div>
                    <div className="Home__booking-select-options">
                        <div className="Home__booking-select-option" data-type="adults">
                            <button className="Home__booking-select-btn" onClick={handleDecrement}>
                                <img height={30} width={30} src={removeIcon} alt="-" />
                            </button>
                            <p className="Home__booking-option-label">{peoples.adults} дорослий</p>
                            <button className="Home__booking-select-btn" onClick={handleIncrement}>
                                <img height={30} width={30} src={addIcon} alt="+" />
                            </button>
                        </div>
                        <div className="Home__booking-select-option" data-type="children">
                            <button className="Home__booking-select-btn" onClick={handleDecrement}>
                                <img height={30} width={30} src={removeIcon} alt="-" />
                            </button>
                            <p className="Home__booking-option-label">{peoples.children} дитячий</p>
                            <button className="Home__booking-select-btn" onClick={handleIncrement}>
                                <img height={30} width={30} src={addIcon} alt="+" />
                            </button>
                        </div>
                        <div className="Home__booking-passangers-controll">
                            <button onClick={passangersResetHandler} className="Home__booking-passangers-controll-btn">Скинути</button>
                            <button onClick={passangersReadyHandler} className="Home__booking-passangers-controll-btn">Готово</button>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={searchHandler} className="Home__booking-search">Пошук</button>
        </div>
    )
}

export default HomeBooking