import "./Styles/PassangersList.css"

import PassangerLabel from "../PassangerLabel/PassangerLabel"

function PassangersList({ data, request, passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }) {
    return (
        <div className="PassangersList">
            <h3 className="PassangersList__headline"> <span className="PassangersList__headline_number">1</span> Пасажири</h3>
            <div className="PassangerList__container">
                {
                    passangers.map((passanger, index) =>
                        <PassangerLabel id={index + 1} type={passanger.age} data={passanger} {...{passangers, setPassangers, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER}} />
                    )
                }
            </div>
        </div>
    )
}

export default PassangersList