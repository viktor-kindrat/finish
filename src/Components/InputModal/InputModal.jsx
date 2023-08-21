import "./Styles/InputModal.css"

import { gsap } from "gsap";
import { useEffect } from "react";

function InputModal({ passangerForm, setPassangerForm, show, setInputModalShow, bookPlace }) {

    useEffect(() => {
        if (show) {
            let tl = gsap.timeline()
            tl.set("body", { overflowY: "hidden" })
                .set(".InputModal", { display: "flex" })
                .to(".InputModal", { opacity: 1, duration: 0.3 })
        } else {
            let tl = gsap.timeline()
            tl.to(".InputModal", { opacity: 0, duration: 0.3 })
                .set(".InputModal", { display: "none" })
                .set("body", { overflowY: "auto" })
        }
    }, [show])

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

    let handleChange = (e) => setPassangerForm({ ...passangerForm, [e.target.name]: e.target.value })

    return (
        <div className="InputModal">
            <div className="InputModal__container">
                <h2 className="InputModal__headline">Укажіть дані пасажира</h2>
                <div className="InputModal__form">
                    <div className="InputModal__input-container">
                        <label htmlFor="modalUserSurname" className="InputModal__label">Прізвище</label>
                        <input onChange={handleChange} value={passangerForm.surname} id="modalUserSurname" name="surname" type="text" className="InputModal__input" />
                    </div>
                    <div className="InputModal__input-container">
                        <label htmlFor="modalUserName" className="InputModal__label">Ім'я</label>
                        <input onChange={handleChange} value={passangerForm.name} id="modalUserName" name="name" type="text" className="InputModal__input" />
                    </div>
                    <div className="InputModal__input-container">
                        <label htmlFor="modalUserEmail" className="InputModal__label">E-mail</label>
                        <input onChange={handleChange} value={passangerForm.email} inputMode="email" id="modalUserEmail" name="email" type="text" className="InputModal__input" />
                    </div>
                    <div className="InputModal__input-container">
                        <label htmlFor="modalUserPhoneNumber" className="InputModal__label">Номер телефону</label>
                        <input onChange={handleChange} value={normalizeInput(passangerForm.phoneNumber)} inputMode="tel" id="modalUserPhoneNumber" name="phoneNumber" type="text" className="InputModal__input" />
                    </div>
                </div>
                <div className="InputModal__btn-place">
                    <button onClick={() => setInputModalShow(false)} className="InputModal__btn InputModal__btn_reject">Скасувати</button>
                    <button onClick={bookPlace} className="InputModal__btn InputModal__btn_confirm">Підтвердити</button>
                </div>
            </div>
        </div>
    )
}

export default InputModal