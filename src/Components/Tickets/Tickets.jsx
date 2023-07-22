import "./Styles/Tickets.css"
import Ticket from "../Ticket/Ticket"

function Tickets () {
    return (
        <div className="Tickets">
            <h2 className="Tickets__headline">Мої бронювання</h2>
            <div className="Tickets__container">
                <Ticket canceled={false} arrivalDate={1691229600000} />
                <Ticket canceled={true} arrivalDate={1690025830872} />
                <Ticket canceled={false} arrivalDate={1688551200000} />
            </div>
        </div>
    )
}

export default Tickets