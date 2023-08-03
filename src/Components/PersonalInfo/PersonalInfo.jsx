import { useState } from "react";
import "./Styles/PersonalInfo.css"

function PersonalInfo({ userData, setUserData, alertData, setAlertData, SERVER }) {
    let [editorData, setEditorData] = useState({ ...userData, password: "", confirmPassword: "" })
    const isDataChanged = JSON.stringify(editorData) !== JSON.stringify({ ...userData, password: "", confirmPassword: "" });

    let resetHandler = ()=>{
        setEditorData({ ...userData, password: "", confirmPassword: "" })
    }

    const normalizeInput = (value) => {
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

    let [phone, setPhone] = useState(userData.phoneNumber);

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const normalizedValue = normalizeInput(value);
        setPhone(normalizedValue);
        setEditorData({ ...editorData, phoneNumber: normalizedValue });
    };

    let handleChange = (e) => {
        let fieldName = e.target.name;
        let newEditorData = { ...editorData }
        newEditorData[fieldName] = e.target.value
        setEditorData(newEditorData)
    }
    return (
        <div className="PersonalInfo">
            <h2 className="PersonalInfo__headline">Персональні дані</h2>
            <div className="PersonalInfo__fields">
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Прізвище</p>
                        <input onChange={handleChange} name="surname" value={editorData.surname} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Ім’я</p>
                        <input onChange={handleChange} name="name" value={editorData.name} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">E-Mail</p>
                        <input onChange={handleChange} name="email" value={editorData.email} type="text" className="PersonalInfo__input" />
                    </div>
                </div>
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label"> Номер телефону</p>
                        <input name="phoneNumber" onChange={handlePhoneChange} value={phone} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Пароль</p>
                        <input autoComplete="false" onChange={handleChange} name="password" value={editorData.password} type="password" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Повторити пароль</p>
                        <input autoComplete="false" onChange={handleChange} name="confirmPassword" value={editorData.confirmPassword} type="password" className="PersonalInfo__input" />
                    </div>
                </div>
            </div>
            <div className="PersonalInfo__btn-container">
                <button className="PersonalInfo__btn">Зберегти</button>
                {isDataChanged && <button onClick={resetHandler} className="PersonalInfo__btn PersonalInfo__btn_outlined">Скинути</button>}
            </div>
        </div>
    )
}

export default PersonalInfo