import "./Styles/HeaderNavMobile.css"
import tgIcon from "../Images/telegram.webp";
import whatsappIcon from "../Images/whatsapp.webp";
import viberIcon from "../Images/viber.webp"

import { useState } from "react";


function HeaderNavMobile() {
    const [phone, setPhone] = useState('');

    const normalizeInput = (value, previousValue) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 7) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 10) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 12) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };


    const handleChange = (event) => {
        const { value } = event.target;
        const normalizedValue = normalizeInput(value, phone);
        setPhone(normalizedValue);
    };

    return (
        <div className="HeaderNavMobile">
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Контакти</h2>
                <div className="HeaderNavMobile__info">
                    <p className="HeaderNavMobile__info-data">+38 (065) 641-48-46</p>
                    <p className="HeaderNavMobile__info-data">+38 (065) 641-48-46</p>
                    <p className="HeaderNavMobile__info-data HeaderNavMobile__info-data_bold">help@mail.com</p>
                </div>
            </div>
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Треба допомога?</h2>
                <div className="HeaderNavMobile__info">
                    <div className="HeaderNavMobile__info-caption">Вкажіть свій контактний телефон і наш спеціаліст зв'яжеться з Вами</div>
                    <input value={phone} onChange={handleChange} type="text" placeholder="+38( _ _ _ ) - _ _ _ - _ _ - _ _ " className="HeaderNavMobile__input" />
                    <button className="HeaderNavMobile__btn">Відправити</button>
                </div>
            </div>
            <div className="HeaderNavMobile__socials">
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={tgIcon} alt="telegram" />
                </a>
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={whatsappIcon} alt="whatsapp" />
                </a>
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={viberIcon} alt="viber" />
                </a>
            </div>
        </div>
    )
}

export default HeaderNavMobile