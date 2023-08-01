import "./Styles/Ticket.css"

function Ticket({ arrivalDate, canceled }) {
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
    let dateArrival = new Date(arrivalDate).toDateString().split(" ")
    let timeArrival = new Date(arrivalDate).toTimeString().split(" ")[0].split(":")
    return (
        <article className={`Ticket Ticket_${status}`}>
            <div className="Ticket__locations">
                <div className="Ticket__group">
                    <div className="Ticket__info_bold Ticket__info">{`${timeArrival[0]}:${timeArrival[1]} ${dateArrival[0]}, ${dateArrival[2]} ${dateArrival[1]}`}</div>
                    <div className="Ticket__info">Київ  <br />(Центральний автовокзал)</div>
                </div>
                <div className="Ticket__group">
                    <div className="Ticket__sign">&#8594;</div>
                </div>
                <div className="Ticket__group">
                    <div className="Ticket__info_bold Ticket__info">{`${timeArrival[0]}:${timeArrival[1]} ${dateArrival[0]}, ${dateArrival[2]} ${dateArrival[1]}`}</div>
                    <div className="Ticket__info">Італія-Зюдкройц <br /></div>
                </div>
            </div>
            <div className="Ticket__group">
                <div className="Ticket__info_bigBold">10 048<sup className="Ticket__info_sup">,00</sup> грн</div>
                <div className="Ticket__info Ticket__info_small"> Дорослий: 1, Дитячий: 1</div>
            </div>
            <button disabled={status !== "active"} className="Ticket__action">{status === "canceled" ? "Скасовано" : status === "done" ? "Виконано" : status === "active" ? "Скасувати" : "Помилка"}</button>
        </article>
    )
}

export default Ticket