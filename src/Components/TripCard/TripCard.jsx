import "./Styles/TripCard.css"

function TripCard({ editorOpened, setEditorOpened, viewOpened, setViewOpened }) {
    return (
        <article className="TripCard">
            <div className="TripCard__locations">
                <div className="TripCard__group">
                    <div className="TripCard__info TripCard__info_bold">20:45 пт, 3 лист.</div>
                    <div className="TripCard__info">Україна - Київ (Центральний автовокзал)</div>
                </div>
                <div className="TripCard__sign">
                    &#8594;
                </div>
                <div className="TripCard__group">
                    <div className="TripCard__info TripCard__info_bold">сб, 4 лист.</div>
                    <div className="TripCard__info">Італія - Санремо (Центральний автовокзал)</div>
                </div>
            </div>
            <div className="TripCard__controll">
                <h3 className="TripCard__headline">Україна - Італія</h3>
                <div className="TripCard__places-info"><span className="TripCard__places-info_green">8</span>/<span className="TripCard__places-info_red">32</span></div>
                <div className="TripCard__controll-btn-place">
                    <button className="TripCard__controll-btn TripCard__controll-btn_green">Подробиці</button>
                    <button className="TripCard__controll-btn TripCard__controll-btn_orange">Редагувати</button>
                    <button className="TripCard__controll-btn TripCard__controll-btn_red">Видалити</button>
                </div>
            </div>
        </article>
    )
}

export default TripCard