import "./Styles/TripsControll.css"
import plusIcon from "./SVG/plus.svg"

import { useState } from "react"

import TripCard from '../TripCard/TripCard'
import TripEditor from "../TripEditor/TripEditor"
import ViewTrip from "../ViewTrip/ViewTrip"

function TripsControll() {
    let [editorOpened, setEditorOpened] = useState(false);
    let [viewOpened, setViewOpened] = useState(false);

    return (
        <section className="TripsControll">
            {
                !editorOpened && !viewOpened ? <>
                    <div className="TripsControll__head">
                        <div className="TripsControll__headline">Рейси</div>
                        <button onClick={() => setEditorOpened(true)} className="TripsControll__head-btn">Додати рейс <img height={14} src={plusIcon} alt="" /></button>
                    </div>
                    <div className="TripsControll__container">
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                        <TripCard {...{ editorOpened, setEditorOpened, viewOpened, setViewOpened }} />
                    </div>
                </> : editorOpened ? <TripEditor {...{editorOpened, setEditorOpened}}/> : viewOpened ? <ViewTrip {...{viewOpened, setViewOpened}}/> : "ERROR"
            }
        </section>
    )
}

export default TripsControll