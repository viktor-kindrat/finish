import "./Styles/TripEditor.css"

import addIcon from "./SVG/plus.svg"

import TripEditorCard from "./TripEditorCard"

import { useState } from "react"
function TripEditor({ editorOpened, setEditorOpened }) {
    let [states, setStates] = useState([{country: "", city: "", location: "", arrivalDate: "", adultPrice: "", childPrice: ""}]);

    let handlePushNewState = (e) => {
        setStates([...states, {country: "", city: "", location: "", arrivalDate: "", adultPrice: "", childPrice: ""}])
    }
    return (
        <div className="TripEditor">
            <div className="TripEditor__card">
                <h2 className="TripEditor__headline">Новий рейс</h2>
                <div className="TripEditor__card-content">
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Назва рейсу </div>
                        <input type="text" className="TripEditor__input" />
                    </div>
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Водій </div>
                        <input type="text" className="TripEditor__input" />
                    </div>
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Номер телефону  </div>
                        <input type="text" className="TripEditor__input" />
                    </div>
                </div>
            </div>
            <div className="TripEditor__wrap">
                <TripEditorCard {...{...states[0]}} {...{states, setStates}} finish={false} id={1} />
                <div className="TripEditor__container">
                    {
                        states.map((el, id) =>
                            id === 0 ? "" : <TripEditorCard {...{...el}} {...{states, setStates}} finish={false} key={id} id={id + 1} />
                        )
                    }
                </div>
                <button onClick={handlePushNewState} className="TripEditor__add-btn"> Додати зупинку <img height={12} src={addIcon} alt="" /></button>
                <TripEditorCard finish={true} />
            </div>
            <button onClick={()=>setEditorOpened(false)} className="TripEditor__save-btn">Зберегти</button>
        </div>
    )
}

export default TripEditor