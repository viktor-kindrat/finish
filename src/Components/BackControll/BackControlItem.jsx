import closeIcon from "./SVG/close.svg";
function BackControlItem() {
    return(
        <div className="BackControll__item">
            <div className="BackControll__item-head">Україна - Італія <button className="BackControll__item-close-btn"><img src={closeIcon} alt="close"/></button></div>
            <div className="BackControll__item-content">
                <div className="BackControll__item-content-row">
                    <div className="BackControll__item-column">
                        <div className="BackControll__item-info BackControll__item-info_bigBold">Київ</div>
                        <div className="BackControll__item-info">14:00</div>
                        <div className="BackControll__item-info">11.07.2023</div>
                    </div>
                    <div className="BackControll__item-sign">&gt;</div>
                    <div className="BackControll__item-column">
                        <div className="BackControll__item-info BackControll__item-info_bigBold">Санремо</div>
                        <div className="BackControll__item-info">15:00</div>
                        <div className="BackControll__item-info">14.07.2023</div>
                    </div>
                    <div className="BackControll__item-column">
                        <div className="BackControll__item-info">Місце:</div>
                        <div className="BackControll__item-info">1,2,6</div>
                    </div>
                </div>
                <h3 className="BackControll__item-headline">Добра Наталья</h3>
                <p className="BackControll__item-subheadline">+38(066)699-03-02</p>
            </div>
        </div>
    )
}

export default BackControlItem