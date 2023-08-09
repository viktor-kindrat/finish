import "./Styles/SearchingResult.css"

import { useEffect, useContext, useState } from "react"
import urlContext from "../../Context/ServerHostnameContext"
import { gsap } from "gsap"

import FlightCard from "../FlightCard/FlightCard"

function SearchingResult({ triggerSearch, setTriggerSearch, setSearchingData, data }) {
    let server = useContext(urlContext).server;

    let [pending, setPending] = useState(true)

    useEffect(() => {
        let tl = gsap.timeline();
        if (document.querySelector(".SearchingResult")) {
            tl.set(".SearchingResult", { display: "flex" })
            tl.fromTo(".SearchingResult", { opacity: 0 }, { opacity: 1, duration: 0.3 })
        }
    }, [])

    function areAllFieldsDefined(obj) {
        for (const prop in obj) {
            if (obj[prop] === undefined) {
                return false;
            }
            if (typeof obj[prop] === 'object' && !areAllFieldsDefined(obj[prop])) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        setPending(true)
        if (areAllFieldsDefined(data)) {
            let obj = {
                arrivalDate: data.arrivalDate,
                from: {
                    country: data.from.country,
                    city: data.from.place
                },
                to: {
                    country: data.to.country,
                    city: data.to.place
                }
            };

            console.log(obj);

            fetch(`${server}book/get-actual-trips`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj) })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPending(false)
                });
        }
    }, [triggerSearch, setPending])
    console.log(data)
    return (
        <section className="SearchingResult">
            <div className="SearchingResult__container">
                <FlightCard id={0} />
                <FlightCard id={1} />
                <FlightCard id={2} />
                <FlightCard id={3} />
                <FlightCard id={4} />
            </div>
        </section>
    )
}

export default SearchingResult