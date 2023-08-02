import "./Styles/Authorization.css"
import { useState } from "react"

function Authorization({ handleLogin, handleSignUp, handleRecover, handleEdit, isEdit, userData, setUserData }) {
    let [state, setState] = useState(isEdit ? "edit" : "login");

    let handleChange = (e) => {
        let fieldName = e.target.name;
        let newUserData = {...userData}
        newUserData[fieldName] = e.target.value
        console.log(newUserData);
        setUserData(newUserData)
    }

    let actionHandler = (e) => {
        switch (state) {
            case "login":
                handleLogin()
                break;
            case "signUp":
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

    return (
        <section className="Authorization" >
            <div className="Authorization__container" style={(state !== "recover" && state !== "edit") ? {} : { borderRadius: "20px" }}>
                {
                    state === "edit" ? <>
                        <h2 className="Authorization__hadline">{userData.name} {userData.surname}</h2>
                    </> : ""
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
                        <input value={userData.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" className="Authorization__input" />
                    </div> : ""
                }
                {
                    state !== "recover" ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Пароль</div>
                        <input value={userData.password} onChange={handleChange} name="password" type="password" className="Authorization__input" />
                    </div> : "password"
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
                <div onClick={(e) => setState("recover")} className="Authorization__recover">Забули пароль?</div>
            </div>
        </section>
    )
}

export default Authorization