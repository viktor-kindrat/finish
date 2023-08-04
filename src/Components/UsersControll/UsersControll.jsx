import "./Styles/UsersControl.css"
import "../Authorization/Styles/Authorization.css"

import searchIcon from "./SVG/search.svg"
import editIcon from "./SVG/edit.svg"

import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader"

import hostnames from "../../Context/ServerHostnameContext";

function UsersControll({ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let [openedEdit, setOpenedEdit] = useState(false);
    let [editorData, setEditorData] = useState({});

    let server = useContext(hostnames).server
    let go = useNavigate();

    let [pending, setPending] = useState(true);
    let [page, setPage] = useState(1);
    let [query, setQuery] = useState("")
    let users = useRef(undefined);
    let pagesArray = useRef([]);
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        setPending(true);
        pagesArray.current = [];
        users.current = [];

        fetch(`${server}auth/admin/get-all-user-data/?page=${page}&query=${query}`, { method: 'GET', headers: { Authorization: `Bearer ${getCookie('userToken')}` }, signal: abortController.signal, })
            .then((res) => res.json())
            .then((data) => {
                users.current = data.data;
                for (let i = 1; i <= data.pagesCount; i++) {
                    pagesArray.current.push(i);
                }
                setPending(false);
            })
            .catch((e) => console.log(e));

        return () => {
            abortController.abort();
        };
    }, [page, query, openedEdit, getCookie, server])

    let handleChangePage = (e) => {
        setPage(parseInt(e.target.innerText));
    }

    let handleEdit = (e) => {
        let { id } = e.target.parentElement.dataset;
        let data = users.current.filter(item => item._id === id)[0];
        setEditorData({ ...data, password: "", confirmPassword: "" })
        setOpenedEdit(true)
    }

    let handleChangeEditorInfo = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        let data = { ...editorData };
        data[field] = value;
        setEditorData(data)
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

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const normalizedValue = normalizeInput(value);
        setEditorData({ ...editorData, phoneNumber: normalizedValue })
    };

    const handleSave = (e) => {
        let { password, confirmPassword, email, phoneNumber, name, surname } = editorData;
        let id = editorData._id;
        let data = { email, phoneNumber, name, surname }
        let passwordValid = password.length > 0 ? password === confirmPassword : true;
        let areNotEmptyFields = Object.keys(data).map(key => data[key].length > 0 ? true : false).filter(item => !item).length === 0

        if (passwordValid && areNotEmptyFields) {
            let send = { id, email, phoneNumber, name, surname };
            if (password.length > 0) send.password = password
            SERVER("Зберігаємо дані користувача", "POST", "auth/admin/change-user-data", "application/json", send, getCookie("userToken")).then(data => {
                if (data.message?.toLowerCase().includes("помилка")) {
                    if (data.errorMessage?.includes("token")) {
                        setAlertData({
                            delay: 0.9, show: true, message: "Термін дії вашого входу сплив. Увійдіть повторно", actionCaption: "Увійти", action: () => {
                                setUserData(undefined);
                                setCookie("userToken", "", 0);
                                go("/authorization")
                            }
                        })
                    }
                    if (data.errorMessage?.toLowerCase().includes("valid")) {
                        console.log(data)
                        setAlertData({ delay: 0, show: true, message: "Перевірте правильність введених даних.", actionCaption: "Зрозуміло", action: () => { } })
                    }
                } else {
                    setAlertData({
                        delay: 0.9, show: true, message: data.message, actionCaption: "До користувачів", action: () => {
                            setPage(1);
                            setPending(true)
                            setOpenedEdit(false)
                            setEditorData({})
                        }
                    })
                }
            })
        } else {
            setAlertData({ delay: 0, show: true, message: "Перевірте правильність введених даних. Паролі не співпадають або форма містить пусті поля.", actionCaption: "Зрозуміло", action: () => { } })
        }
    }
    return (
        <section className="UsersControl">
            <h2 className="UsersControl__headline">Користувачі</h2>
            <input style={{ backgroundImage: `url(${searchIcon})` }} type="text" className="UsersControll__search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Пошук" />
            {
                !pending && users.current ? !openedEdit ? <>
                    <div className="UsersControl__results">
                        {
                            users.current.map(user =>
                                <div className="UsersControl__user" data-email={user.email} data-id={user._id}>
                                    {user.name} {user.surname}
                                    <button onClick={handleEdit} className="UsersControl__edit-button"><img src={editIcon} alt="edit" />
                                    </button>
                                </div>)
                        }
                    </div>
                    <div className="UsersControl__pagination">
                        {
                            pagesArray.current.length === 0 ? "Користувачів немає" : pagesArray.current.map((item, index) => <><div onClick={handleChangePage} className={"UsersControl__pagination-btn " + (page === item ? "UsersControl__pagination-btn_active" : "")}>{item}</div> {index !== pagesArray.current.length - 1 ? "," : ""}</>)
                        }
                    </div>
                </> : <>
                    <div className="Authorization">
                        <div className="Authorization__container">
                            <h2 className="UsersControl__headline">{`${editorData?.name} ${editorData?.surname}`}</h2>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">Прізвище</div>
                                <input onChange={handleChangeEditorInfo} name="surname" value={editorData?.surname} type="text" className="Authorization__input" />
                            </div>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">Ім’я</div>
                                <input onChange={handleChangeEditorInfo} name="name" value={editorData?.name} type="text" className="Authorization__input" />
                            </div>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">E-Mail</div>
                                <input onChange={handleChangeEditorInfo} name="email" value={editorData?.email} type="text" className="Authorization__input" />
                            </div>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">Номер телефону</div>
                                <input name="phoneNumber" onChange={handlePhoneChange} value={editorData.phoneNumber} type="text" className="Authorization__input" />
                            </div>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">Пароль</div>
                                <input onChange={handleChangeEditorInfo} name="password" value={editorData?.password} type="password" className="Authorization__input" />
                            </div>
                            <div className="Authorization__input-wrap">
                                <div className="Authorization__input-label">Пароль ще раз</div>
                                <input onChange={handleChangeEditorInfo} name="confirmPassword" value={editorData?.confirmPassword} type="password" className="Authorization__input" />
                            </div>
                            <button onClick={handleSave} className="Authorization__action">Зберегти</button>
                            <button onClick={() => setOpenedEdit(false)} className="Authorization__action Authorization__action_cancel">Скасувати</button>
                        </div>
                    </div>
                </> : <BuiltInLoader />
            }
        </section>
    )
}

export default UsersControll