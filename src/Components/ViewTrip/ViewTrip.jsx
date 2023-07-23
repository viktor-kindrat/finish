import "./Styles/ViewTrip.css"

import Autobus from "../Autobus/Autobus"

function ViewTrip({ viewOpened, setViewOpened }) {
    return (
        <div className="ViewTrip">
            <Autobus />
            <div className="ViewTrip__actions">
                <button className="ViewTrip__action ViewTrip__action_green">Бронювати</button>
                <button className="ViewTrip__action ViewTrip__action_red">Звільнити</button>
            </div>
            <h2 className="ViewTrip__headline">Заброньовано</h2>
            <div className="ViewTrip__records">
                <div className="ViewTrip__record">
                    <div className="ViewTrip__record-head">Місце 2</div>
                    <div className="ViewTrip__record-body">
                        <h3 className="ViewTrip__record-headline">Добра Наталья</h3>
                        <p className="ViewTrip__record-info">+38(066)699-03-02</p>

                        <div className="ViewTrip__sub-passanger">
                            <div className="ViewTrip__record-head">Місце 6</div>
                            <div className="ViewTrip__record-body">
                                <h4 className="ViewTrip__record-headline">Добра Вікторія</h4>
                            </div>
                        </div>
                        <div className="ViewTrip__sub-passanger">
                            <div className="ViewTrip__record-head">Місце 5</div>
                            <div className="ViewTrip__record-body">
                                <h4 className="ViewTrip__record-headline">Добра Оксана</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTrip