import "./Styles/UsersControl.css"
import "../Authorization/Styles/Authorization.css"

import searchIcon from "./SVG/search.svg"
import editIcon from "./SVG/edit.svg"

import {useState} from "react";

function UsersControll() {
    let [currentPage, setCurrentPage] = useState(1);
    let [openedEdit, setOpenedEdit] = useState(false);
    let [phone, setPhone] = useState("+38 (066) 699-03-01")
    let handleChangePage = (e) => {
        setCurrentPage(parseInt(e.target.innerText));
    }
    let handleEdit = (e) => {
        setOpenedEdit(true)
    }

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
        const {value} = event.target;
        const normalizedValue = normalizeInput(value, phone);
        setPhone(normalizedValue);
    };
    return (<section className="UsersControl">
        {!openedEdit ? <>
            <h2 className="UsersControl__headline">Користувачі</h2>
            <input style={{backgroundImage: `url(${searchIcon})`}} type="text" className="UsersControll__search"
                   placeholder="Пошук"/>
            <div className="UsersControl__results">
                <div className="UsersControl__user">
                    Добрий Володимир
                    <button onClick={handleEdit} className="UsersControl__edit-button"><img src={editIcon} alt="edit"/>
                    </button>
                </div>
                <div className="UsersControl__user">
                    Добрий Володимир
                    <button onClick={handleEdit} className="UsersControl__edit-button"><img src={editIcon} alt="edit"/>
                    </button>
                </div>
            </div>
            <div className="UsersControl__pagination">
                <div onClick={handleChangePage}
                     className={"UsersControl__pagination-btn " + (currentPage === 1 ? "UsersControl__pagination-btn_active" : "")}>1
                </div>
                ,
                <div onClick={handleChangePage}
                     className={"UsersControl__pagination-btn " + (currentPage === 2 ? "UsersControl__pagination-btn_active" : "")}>2</div>
            </div>
        </> : <>
            <div className="Authorization">
                <div className="Authorization__container">
                    <h2 className="UsersControl__headline">Добрий Володимир</h2>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Прізвище</div>
                        <input defaultValue={"Володимир"} type="text" className="Authorization__input"/>
                    </div>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Ім’я</div>
                        <input defaultValue={"Добрий"} type="text" className="Authorization__input"/>
                    </div>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">E-Mail</div>
                        <input defaultValue={"mail@gmail.com"} type="text" className="Authorization__input"/>
                    </div>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Номер телефону</div>
                        <input onChange={handlePhoneChange} value={phone} type="text" className="Authorization__input"/>
                    </div>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Пароль</div>
                        <input type="password" className="Authorization__input"/>
                    </div>
                    <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Пароль ще раз</div>
                        <input type="password" className="Authorization__input"/>
                    </div>
                    <button className="Authorization__action">Зберегти</button>
                </div>
            </div>
        </>}
    </section>)
}

export default UsersControll