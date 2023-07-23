import "./Styles/TripsControll.css"
import plusIcon from "./SVG/plus.svg"

import { useState } from "react"
import TripCard from '../TripCard/TripCard'

function TripsControll (){
    let [editorOpened, setEditorOpened] = useState(false);
    let [viewOpened, setViewOpened] = useState(false);

    return (
        <section className="TripsControll">
            <div className="TripsControll__head">
                <div className="TripsControll__headline">Рейси</div>
                <button className="TripsControll__head-btn">Додати рейс <img height={14} src={plusIcon} alt="" /></button>
            </div>
            <div className="TripsControll__container">
                <TripCard {...{editorOpened, setEditorOpened, viewOpened, setViewOpened}} />
                <TripCard {...{editorOpened, setEditorOpened, viewOpened, setViewOpened}} />
                <TripCard {...{editorOpened, setEditorOpened, viewOpened, setViewOpened}} />
            </div>
        </section>
    )
}

export default TripsControll