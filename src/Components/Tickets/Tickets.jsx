import "./Styles/Tickets.css"
import Ticket from "../Ticket/Ticket"

function Tickets({ getCookie, setCookie, userData, setUserData, alertData, setAlertData, modalData, setModalData, SERVER }) {
    return (
        <div className="Tickets">
            <h2 className="Tickets__headline">Мої бронювання</h2>
            <div className="Tickets__container">
                {
                    (userData.tickets && userData.tickets.lenght !== 0) ? userData.tickets.map((item, index) => {
                        return <Ticket key={index} data={item} arrivalDate={1791229600000} {...{ modalData, setModalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />
                    }) : "Поки що немає бронювань"
                }
            </div>
        </div>
    )
}

export default Tickets