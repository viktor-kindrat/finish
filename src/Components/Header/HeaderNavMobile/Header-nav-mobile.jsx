import "./Styles/HeaderNavMobile.css"
import tgIcon from "../SVG/telegram.svg";
import whatsappIcon from "../SVG/whatsapp.svg";
import viberIcon from "../SVG/viber.svg"

import PhoneInput from "../../UI/PhoneInput/PhoneInput";

import { useState, useContext } from "react";
import linkContext from "../../../Context/ServerHostnameContext"


function HeaderNavMobile({ alertData, setAlertData }) {
    const [phone, setPhone] = useState('');

    let server = useContext("linkContext").server

    let needHelpHandler = () => {
        console.log(phone)
        fetch(`${server}need-help`, { mehtod: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ phoneNumber: phone }) })
            .then(res => res.json())
            .then(data => setAlertData({ delay: 0, show: true, message: data.message, actionCaption: "закрити", action: () => { } }))
            .catch(e => console.log(e))
    }

    return (
        <div className="HeaderNavMobile">
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Контакти</h2>
                <div className="HeaderNavMobile__info">
                    <a href="tel:+380508881234"><p className="HeaderNavMobile__info-data">+38 (050) 888 12 34</p></a>
                    <a href="tel:+380508881234"><p className="HeaderNavMobile__info-data">+38 (050) 888 12 34</p></a>
                    <a href="mailto:mail@group-alliance.com?subject=Допомога на сайті"><p className="HeaderNavMobile__info-data HeaderNavMobile__info-data_bold">mail@group-alliance.com</p></a>
                </div>
            </div>
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">ПОТРІБНА ДОПОМОГА ?</h2>
                <div className="HeaderNavMobile__info">
                    <div className="HeaderNavMobile__info-caption">Замовити зворотній дзвінок від менеджера</div>
                    <PhoneInput boxClassSelector="HeaderNavMobile__phone-input-wrapper" inputClassSelector="HeaderNavMobile__phone-input" setPhoneNumber={setPhone} />
                    <button onClick={needHelpHandler} className="HeaderNavMobile__btn">Відправити</button>
                </div>
            </div>
            <div className="HeaderNavMobile__section HeaderNavMobile__socials">
                <a href="https://t.me/+380508881234" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={tgIcon} alt="telegram" />
                </a>
                <div className="HeaderNavMobile__socials-separator">|</div>
                <a href="https://wa.me/380508881234" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={whatsappIcon} alt="whatsapp" />
                </a>
                <div className="HeaderNavMobile__socials-separator">|</div>
                <a href="viber://chat/?number=%2B380508881234" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={viberIcon} alt="viber" />
                </a>
            </div>
            <div className="HeaderNavMobile__footer">
                GROUP ALLIANCE  - {new Date().getFullYear()}
            </div>
        </div>
    )
}

export default HeaderNavMobile