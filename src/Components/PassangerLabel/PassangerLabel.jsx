import "./Style/PassangerLabel.css"

function PassangerLabel ({id, type, passangers, setPassangers, data}) {
    let handleChange = (e)=>{
        let label = e.target.name;
        let newPassangers = [...passangers];
        newPassangers[id - 1].userDetails[label] = e.target.value;
        setPassangers(newPassangers)
    }
    return (
        <div className="PassangerLabel">
            <div className="PassangerLabel__head">{id}. {type === "child" ? "Дитячий" : "Дорослий"}</div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Ім'я</div>
                <input name="name" onChange={handleChange} type="text" className="PassangerLabel__input" value={data.userDetails.name} />
            </div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Прізвище</div>
                <input name="surname" onChange={handleChange} type="text" className="PassangerLabel__input" value={data.userDetails.surname} />
            </div>
        </div>
    )
}

export default PassangerLabel