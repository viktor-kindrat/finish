function TripEditorCard({id, finish}) {
    return (
        <div className="TripEditor__card">
            <h2 className="TripEditor__headline">{finish ? "Прибуття" : `${id + 1} зупинка`}</h2>
            <div className="TripEditor__card-content">
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Країна </div>
                    <input type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Місто </div>
                    <input type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Локація </div>
                    <input type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Час та Дата прибуття </div>
                    <input type="datetime-local" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Вартість дорослий </div>
                    <input type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Вартість дитячий </div>
                    <input type="text" className="TripEditor__input" />
                </div>
            </div>
        </div>
    )
}

export default TripEditorCard