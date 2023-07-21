import "./Styles/PassangersList.css"

import PassangerLabel from "../PassangerLabel/PassangerLabel"

function PassangersList (){
    return (
        <div className="PassangersList">
            <h3 className="PassangersList__headline"> <span className="PassangersList__headline_number">1</span> Пасажири</h3>
            <div className="PassangerList__container">
                <PassangerLabel id="1" type="adults"/>
                <PassangerLabel id="2" type="adults"/>
                <PassangerLabel id="3" type="children"/>
            </div>
        </div>
    )
}

export default PassangersList