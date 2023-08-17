import "./Styles/HeaderNavMobile.css"
import tgIcon from "../Images/telegram.webp";
import whatsappIcon from "../Images/whatsapp.webp";
import viberIcon from "../Images/viber.webp"

import PhoneInput from "../../UI/PhoneInput/PhoneInput";

import { useState } from "react";


function HeaderNavMobile() {
    const [phone, setPhone] = useState('');
    console.log(phone)

    return (
        <div className="HeaderNavMobile">
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Контакти</h2>
                <div className="HeaderNavMobile__info">
                    <a href="tel:+380666990301"><p className="HeaderNavMobile__info-data">+38 (066) 699-03-01</p></a>
                    <a href="tel:+380666990301"><p className="HeaderNavMobile__info-data">+38 (066) 699-03-01</p></a>
                    <a href="mail:mail@group-alliance.com"><p className="HeaderNavMobile__info-data HeaderNavMobile__info-data_bold">mail@group-alliance.com</p></a>
                </div>
            </div>
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">ПОТРІБНА ДОПОМОГА ?</h2>
                <div className="HeaderNavMobile__info">
                    <div className="HeaderNavMobile__info-caption">Замовити зворотній дзвінок від менеджера</div>
                    <PhoneInput boxClassSelector="HeaderNavMobile__phone-input-wrapper" inputClassSelector="HeaderNavMobile__phone-input" setPhoneNumber={setPhone} />
                    <button className="HeaderNavMobile__btn">Відправити</button>
                </div>
            </div>
            <div className="HeaderNavMobile__section HeaderNavMobile__socials">
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={tgIcon} alt="telegram" />
                </a>
                <div className="HeaderNavMobile__socials-separator">|</div>
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={whatsappIcon} alt="whatsapp" />
                </a>
                <div className="HeaderNavMobile__socials-separator">|</div>
                <a href="/" className="HeaderNavMobile__socials-item">
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