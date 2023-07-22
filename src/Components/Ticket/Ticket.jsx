import "./Styles/Ticket.css"

function Ticket ({arrivalDate, canceled}){
    let getStatus = (arrivalDate) => {
        let now = new Date();
        let arrivalDateObject = new Date(arrivalDate);
        if (now.getTime() >= arrivalDateObject.getTime()) {
            return "done"
        } else {
            return "active"
        }
    }
    let status = canceled ? "canceled" : getStatus(arrivalDate)
    return (
        <article className={`Ticket Ticket_${status}`}>
            TICKET with time {arrivalDate} status {status}
        </article>
    )
}

export default Ticket