import "./Style/PassangerLabel.css"

import { useEffect, useState, useCallback } from "react";

function PassangerLabel({ id, type, passangers, setPassangers, data, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    let handleChange = useCallback((e) => {
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

    useEffect(() => {
        if (userData) {
            setFirstData({ ...userData })
            let newPassangers = [...passangers];
            newPassangers[0] = {
                isInitiator: true,
                initiatorContacts: {
                    phone: userData.phoneNumber,
                    email: userData.email
                },
                userDetails: {
                    ...newPassangers[0].userDetails,
                    name: userData.name,
                    surname: userData.surname
                },
                invitatorId: userData._id,
                age: "adult"
            }

            let changes = newPassangers.map((item, index) => {
                return {
                    ...item,
                    initiatorContacts: {
                        phone: userData.phoneNumber,
                        email: userData.email
                    },
                    invitatorId: userData._id
                }
            })
            setPassangers(changes)
        }// eslint-disable-next-line
    }, [setFirstData, setPassangers, userData])
    return (
        <div className="PassangerLabel">
            <div className="PassangerLabel__head">{id}. {type === "child" ? "Дитячий" : "Дорослий"}</div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Ім'я</div>
                <input name="name" onChange={handleChange} type="text" className="PassangerLabel__input" value={id === 1 && userData ? firstData.name : data.userDetails.name} />
            </div>
            <div className="PassangerLabel__input-group">
                <div className="PassangerLabel__input-label">Прізвище</div>
                <input name="surname" onChange={handleChange} type="text" className="PassangerLabel__input" value={id === 1 && userData ? firstData.surname : data.userDetails.surname} />
            </div>
        </div>
    )
}

export default PassangerLabel