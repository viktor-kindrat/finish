import "./Styles/PassangersList.css"

import PassangerLabel from "../PassangerLabel/PassangerLabel"

function PassangersList({ data, searchingData, passangers, setPassangers, userData, setUserData, getCookie, setCookie }) {
    console.log("passangers", passangers)
    return (
        <div className="PassangersList">
            <h3 className="PassangersList__headline"> <span className="PassangersList__headline_number">1</span> Пасажири</h3>
            <div className="PassangerList__container">
                {
                    (passangers) ? passangers.map((passanger, index) =>
                        <PassangerLabel id={index + 1} type={passanger.age} data={passanger} {...{ passangers, setPassangers, userData, setUserData, getCookie, setCookie }} />
                    ) : ""
                }
            </div>
        </div>
    )
}

export default PassangersList