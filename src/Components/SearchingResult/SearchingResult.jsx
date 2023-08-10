import "./Styles/SearchingResult.css"

import { useEffect, useContext, useState, useRef } from "react"
import urlContext from "../../Context/ServerHostnameContext"
import { gsap } from "gsap"

import FlightCard from "../FlightCard/FlightCard"
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

function SearchingResult({ triggerSearch, setTriggerSearch, setSearchingData, data }) {
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
        if (areAllFieldsDefined(data) && Object.keys(data).length > 0) {
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

            fetch(`${server}book/get-actual-trips`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj) })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    storage.current = data.data
                    setPending(false)
                });
        } else {
            storage.current = false
            setPending(false)
        }
    }, [triggerSearch, setPending])

    return (
        <section className="SearchingResult">
            {
                !pending ?
                    storage.current ?
                        <div className="SearchingResult__container">
                            {
                                storage.current.map(item => {
                                    return <FlightCard key={item._id} id={item._id} data={item} request={data}/>
                                })
                            }
                        </div> : <h3 className="SearchingResult__info">Нічого не знайдено</h3>
                    : <BuiltInLoader />
            }
        </section>
    )
}

export default SearchingResult