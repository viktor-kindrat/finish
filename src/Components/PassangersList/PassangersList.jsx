import "./Styles/PassangersList.css"

import PassangerLabel from "../PassangerLabel/PassangerLabel"
import { useEffect } from "react"

function PassangersList({ data, request, passangers, setPassangers }) {
    console.log(passangers)
    return (
        <div className="PassangersList">
            <h3 className="PassangersList__headline"> <span className="PassangersList__headline_number">1</span> Пасажири</h3>
            <div className="PassangerList__container">
                {
                    passangers.map((passanger, index) =>
                        <PassangerLabel id={index + 1} type={passanger.age} data={passanger} {...{passangers, setPassangers}} />

                    )
                }
                {/* <PassangerLabel id="2" type="adults" />
                <PassangerLabel id="3" type="children" /> */}
            </div>
        </div>
    )
}

export default PassangersList