import "./Style/PassangerLabel.css"

import { useEffect, useState, useCallback } from "react";

function PassangerLabel ({id, type, passangers, setPassangers, data, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER}) {
    let handleChange = useCallback((e)=>{
        if (userData && id === 1) {
            return false
        } else {
            let label = e.target.name;
            let newPassangers = [...passangers];
            newPassangers[id - 1].userDetails[label] = e.target.value;
            setPassangers(newPassangers)
        }
    }, [passangers, setPassangers, id, userData])

    let [firstData, setFirstData] = useState({
        name: "",
        surname: ""
    })

    useEffect(()=>{
        if (userData) {
            setFirstData({...userData})
        }
    }, [setFirstData, setPassangers, userData])
    return (
        <div className="PassangerLabel">
            <div className="PassangerLabel__head">{id}. {type === "child" ? "Дитячий" : "Дорослий"}</div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Ім'я</div>
                <input name="name" onChange={handleChange} type="text" className="PassangerLabel__input" value={ id===1 && userData ? firstData.name : data.userDetails.name} />
            </div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Прізвище</div>
                <input name="surname" onChange={handleChange} type="text" className="PassangerLabel__input" value={ id===1 && userData ? firstData.surname : data.userDetails.surname} />
            </div>
        </div>
    )
}

export default PassangerLabel