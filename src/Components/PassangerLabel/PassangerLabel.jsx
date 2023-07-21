import "./Style/PassangerLabel.css"

function PassangerLabel ({id, type}) {
    return (
        <div className="PassangerLabel">
            <div className="PassangerLabel__head">{id}. {type === "children" ? "Дитячий" : "Дорослий"}</div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Ім'я</div>
                <input type="text" className="PassangerLabel__input" />
            </div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Прізвище</div>
                <input type="text" className="PassangerLabel__input" />
            </div>
        </div>
    )
}

export default PassangerLabel