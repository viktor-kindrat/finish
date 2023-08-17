import "./Styles/Authorization.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Authorization({ logined, handleLogin, handleSignUp, handleRecover, handleEdit, isEdit, userData, setUserData }) {
    let [state, setState] = useState(isEdit ? "edit" : "login");

    let go = useNavigate()

    useEffect(()=>{
        if (logined) {
            go("/account")
        }
    }, [logined, go])

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
        setUserData({...userData, phoneNumber: normalizedValue});
    };

    let handleChange = (e) => {
        let fieldName = e.target.name;
        let newUserData = { ...userData }
        newUserData[fieldName] = e.target.value
        setUserData(newUserData)
    }


    let actionHandler = (e) => {
        switch (state) {
            case "login":
                handleLogin()
                break;
            case "signup":
                handleSignUp()
                break;
            case "recover":
                handleRecover()
                break;
            case "edit":
                handleEdit()
                break;
            default:
                console.log("error of auth form")
                break;
        }
    }

    let backHandler = ()=>{
        setState("login")
    }

    return (
        <section className="Authorization" >
            <div className="Authorization__container" style={(state !== "recover" && state !== "edit") ? {} : { borderRadius: "20px" }}>
                {
                    state === "edit" ? <>
                        <h2 className="Authorization__hadline">{userData.name} {userData.surname}</h2>
                    </> : ""
                }
                {
                    state === "recover" ? <button onClick={backHandler} className="Authorization__action Authorization__action_outline">&#8592; Назад</button> : ""
                }
                {
                    (state !== "recover" && state !== "edit") ?
                        <div className="Authorization__select">
                            <div onClick={(e) => setState("login")} className={`Authorization__option ${state === "login" ? "Authorization__option_selected" : ""}`}>Вхід</div>
                            <div onClick={(e) => setState("signup")} className={`Authorization__option ${state === "signup" ? "Authorization__option_selected" : ""}`}>Реєстрація</div>
                        </div> : ""
                }
                {state === "recover" ? <h2 className="Authorization__headline">Відновлення паролю</h2> : ""}
                {
                    (state === "signup" || state === "edit") ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Ім’я</div>
                            <input value={userData.name} onChange={handleChange} name="name" type="text" className="Authorization__input" />
                        </div>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Прізвище</div>
                            <input value={userData.surname} onChange={handleChange} name="surname" type="text" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <div className="Authorization__input-wrap">
                    <div className="Authorization__input-label">E-Mail</div>
                    <input value={userData.email} onChange={handleChange} name="email" type="text" className="Authorization__input" />
                </div>
                {
                    (state === "signup" || state === "edit") ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Номер телефону</div>
                        <input value={userData.phoneNumber} onChange={handlePhoneChange} name="phoneNumber" type="text" className="Authorization__input" />
                    </div> : ""
                }
                {
                    state !== "recover" ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Пароль</div>
                        <input value={userData.password} onChange={handleChange} name="password" type="password" className="Authorization__input" />
                    </div> : ""
                }
                {
                    (state === "signup" || state === "edit") ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Пароль ще раз</div>
                            <input value={userData.confirmPassword} onChange={handleChange} name="confirmPassword" type="password" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <button onClick={actionHandler} className="Authorization__action">{state === "login" ? "Вхід" : state === "signUp" ? "Зареєструватися" : state === "edit" ? "Зберегти" : "Відправити"}</button>
                {(state !== "recover" && state !== "edit") ? <div onClick={(e) => setState("recover")} className="Authorization__recover">Забули пароль?</div> : ""}
            </div>
        </section>
    )
}

export default Authorization