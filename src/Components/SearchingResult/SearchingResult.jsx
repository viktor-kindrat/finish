import "./Styles/SearchingResult.css"

import { useEffect } from "react"
import { gsap } from "gsap"

import FlightCard from "../FlightCard/FlightCard"

function SearchingResult () {
    useEffect(()=>{
        let tl = gsap.timeline();
        if (document.querySelector(".SearchingResult")) {
            tl.set(".SearchingResult", {display: "flex"})
            tl.fromTo(".SearchingResult", {opacity: 0}, {opacity: 1, duration: 0.3})
        }
    }, [])
    return (
        <section className="SearchingResult">
            <div className="SearchingResult__container">
                <FlightCard />
                <FlightCard />
                <FlightCard />
                <FlightCard />
                <FlightCard />
            </div>
        </section>
    )
}

export default SearchingResult