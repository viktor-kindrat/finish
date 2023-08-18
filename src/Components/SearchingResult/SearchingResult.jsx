import "./Styles/SearchingResult.css"

import { useEffect, useContext, useState, useRef, useCallback } from "react"
import urlContext from "../../Context/ServerHostnameContext"
import { gsap } from "gsap"

import FlightCard from "../FlightCard/FlightCard"
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

function SearchingResult({ setSearchingData, triggerSearch, setTriggerSearch, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER, searchingData }) {
    let server = useContext(urlContext).server;

    let [pending, setPending] = useState(true)
    let storage = useRef(undefined)

    useEffect(() => {
        let tl = gsap.timeline();
        if (document.querySelector(".SearchingResult")) {
            tl.set(".SearchingResult", { display: "flex" })
            tl.fromTo(".SearchingResult", { opacity: 0 }, { opacity: 1, duration: 0.3 })
        }
    }, [])

    let areAllFieldsDefined = useCallback((obj) => {
        for (const prop in obj) {
            if (obj[prop] === undefined) {
                return false;
            }
            if (typeof obj[prop] === 'object' && !areAllFieldsDefined(obj[prop])) {
                return false;
            }
        }
        return true;
    }, [])

    useEffect(() => {
        setPending(true)
        storage.current = []
        let keys = (typeof searchingData === "object") ? Object.keys(searchingData) : []
        if (areAllFieldsDefined(searchingData) && keys.length > 0) {
            storage.current = undefined
            let obj = {
                arrivalDate: searchingData.arrivalDate,
                from: {
                    country: searchingData.from.country,
                    city: searchingData.from.place
                },
                to: {
                    country: searchingData.to.country,
                    city: searchingData.to.place
                }
            };

            fetch(`${server}book/get-actual-trips`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj) })
                .then(res => res.json())
                .then(data => {
                    storage.current = data.data

                    setPending(false)
                });
        } else {
            storage.current = false
            setPending(false)
        }
    }, [triggerSearch, setPending, areAllFieldsDefined, searchingData, server])

    return (
        <section className="SearchingResult">
            {
                !pending ?
                    (storage.current && storage.current.length > 0) ?
                        <div className="SearchingResult__container">
                            {
                                (storage.current.length > 0) ? storage.current.map(item => {
                                    return <FlightCard {...{ userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER, searchingData }} key={item._id} id={item._id} data={item} />
                                }) : <h3 className="SearchingResult__info">Нічого не знайдено</h3>
                            }
                        </div> : <h3 className="SearchingResult__info">Нічого не знайдено</h3>
                    : <BuiltInLoader />
            }
        </section>
    )
}

export default SearchingResult