function TripEditorCard({ id, finish, setStates, states, country, city, location, arrivalDate, adultPrice, childPrice }) {
    let handleChange = (e) => {
        if (!finish) {
            console.log({ ...{ id, finish, setStates, states, country, city, location, arrivalDate, adultPrice, childPrice } });
            let field = e.target.dataset.field;
            let newState = [...states];
            newState[id - 1][field] = e.target.value
            setStates(newState)
        }
    }
    return (
        <div className="TripEditor__card">
            <h2 className="TripEditor__headline">{finish ? "Прибуття" : id === 0 ? "Відправлення" : `${id} зупинка`}</h2>
            <div className="TripEditor__card-content">
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Країна </div>
                    <input onChange={handleChange} data-field="country" value={country} type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Місто </div>
                    <input onChange={handleChange} data-field="city" value={city} type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Локація </div>
                    <input onChange={handleChange} data-field="location" value={location} type="text" className="TripEditor__input" />
                </div>
                <div className="TripEditor__input-conatiner">
                    <div className="TripEditor__input-label">Час та Дата {id === 0 ? "відправлення" : "прибуття"} </div>
                    <input onChange={handleChange} data-field="arrivalDate" value={arrivalDate} type="datetime-local" className="TripEditor__input" />
                </div>
                {
                    id !== 0 ? <>
                        <div className="TripEditor__input-conatiner">
                            <div className="TripEditor__input-label">Вартість дорослий </div>
                            <input onChange={handleChange} data-field="adultPrice" value={adultPrice} type="text" className="TripEditor__input" />
                        </div>
                        <div className="TripEditor__input-conatiner">
                            <div className="TripEditor__input-label">Вартість дитячий </div>
                            <input onChange={handleChange} data-field="childPrice" value={childPrice} type="text" className="TripEditor__input" />
                        </div>
                    </> : ""
                }
            </div>
        </div>
    )
}

export default TripEditorCard