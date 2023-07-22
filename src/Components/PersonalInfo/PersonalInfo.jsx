import { useState } from "react";
import "./Styles/PersonalInfo.css"

function PersonalInfo() {
    let [phone, setPhone] = useState("+38 (066) 699-03-01")
    const normalizeInput = (value, previousValue) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 6) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 9) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 11) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const normalizedValue = normalizeInput(value, phone);
        setPhone(normalizedValue);
    };
    return (
        <div className="PersonalInfo">
            <h2 className="PersonalInfo__headline">Персональні дані</h2>
            <div className="PersonalInfo__fields">
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Прізвище</p>
                        <input defaultValue={"Шевченко"} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Ім’я</p>
                        <input defaultValue={"Андрій"} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">E-Mail</p>
                        <input defaultValue={"mail@gmail.com"} type="text" className="PersonalInfo__input" />
                    </div>
                </div>
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label"> Номер телефону</p>
                        <input onChange={handlePhoneChange} value={phone} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Пароль</p>
                        <input type="password" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Повторити пароль</p>
                        <input type="password" className="PersonalInfo__input" />
                    </div>
                </div>
            </div>
            <button className="PersonalInfo__btn">Зберегти</button>
        </div>
    )
}

export default PersonalInfo