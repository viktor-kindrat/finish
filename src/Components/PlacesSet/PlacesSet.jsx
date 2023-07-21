import "./Styles/PlacesSet.css"
import Autobus from "../Autobus/Autobus"

function PlacesSet() {
    return (
        <div className="PlacesSet">
            <h3 className="PlacesSet__headline"> <span className="PlacesSet__headline_number">2</span> Бронювання місця</h3>
            <Autobus />
        </div>
    )
}

export default PlacesSet