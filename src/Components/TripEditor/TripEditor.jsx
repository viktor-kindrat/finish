import "./Styles/TripEditor.css"

import addIcon from "./SVG/plus.svg"

import TripEditorCard from "./TripEditorCard"

import { useState } from "react"
function TripEditor({ editOpened, setEditOpened }) {
    let [states, setStates] = useState([]);

    let handlePushNewState = (e) => {
        setStates([...states, {}])
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
                <TripEditorCard finish={false} id={0} />
                <div className="TripEditor__container">
                    {
                        states.map((el, id)=>
                        <TripEditorCard key={id} id={id + 1} />    
                        )
                    }
                </div>
                <button onClick={handlePushNewState} className="TripEditor__add-btn"> Додати зупинку <img src={addIcon} alt="" /></button>
                <TripEditorCard finish={true} />
            </div>
        </div>
    )
}

export default TripEditor