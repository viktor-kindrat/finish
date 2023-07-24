import "./Styles/BackControll.css"

import BackControlItem from "./BackControlItem";

function BackControll () {
    return (
        <section className="BackControll">
            <h2 className="BackControll__headline">Повернення</h2>
            <div className="BackControll__container">
                <BackControlItem />
                <BackControlItem />
                <BackControlItem />
            </div>
        </section>
    )
}

export default BackControll