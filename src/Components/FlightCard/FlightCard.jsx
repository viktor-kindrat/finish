import "./Styles/FlightCard.css"

import detailsIcon from "./SVG/details.svg"

function FlightCard (){
    return (
        <article className="FlightCard">
            <div className="FlightCard__locations FlightCard__group">
                <div className="FlightCard__location-column">
                    <p className="FlightCard__info FlightCard__info_bold">20:45 пт, 3 лист.</p>
                    <p className="FlightCard__info">Україна - Київ (Центральний автовокзал)</p>
                </div>
                <div className="FlightCard__arrow">&#8594;</div>
                <div className="FlightCard__location-column">
                    <p className="FlightCard__info FlightCard__info_bold">20:45 пт, 3 лист.</p>
                    <p className="FlightCard__info">Україна - Київ (Центральний автовокзал)</p>
                </div>
            </div>
            <div className="FlightCard__group">
                <p className="FlightCard__info">Доросилий</p>
                <p className="FlightCard__info FlightCard__info_bigBold">5 048 <div className="FlightCard__info_bold">грн</div></p>
            </div>
            <div className="FlightCard__group">
                <p className="FlightCard__info">Дитячий</p>
                <p className="FlightCard__info FlightCard__info_bigBold">3 048 <div className="FlightCard__info_bold">грн</div></p>
            </div>
            <button className="FlightCard__details-btn"><img src={detailsIcon} alt="details" /></button>
        </article>
    )
}

export default FlightCard