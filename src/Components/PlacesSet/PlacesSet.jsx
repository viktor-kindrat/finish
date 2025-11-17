import "./Styles/PlacesSet.css"
import Autobus from "../Autobus/Autobus"

function PlacesSet({places, count, selected, setSelected}) {

    return (
        <div className="PlacesSet">
            <h3 className="PlacesSet__headline"> <span className="PlacesSet__headline_number">2</span> Seat Selection</h3>
            <Autobus count={count} type="USER" places={places} {...{selected, setSelected}} />
        </div>
    )
}

export default PlacesSet