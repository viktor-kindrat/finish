import "./Styles/Authorization.css"
import { useState, useRef } from "react"

import { useNavigate } from "react-router-dom"

function Authorization() {
    let [state, setState] = useState("login");
    let navigate = useNavigate();
    let input = useRef(null)

    let actionHandler = (e) => {
        if (input.current.value === "admin") {
            localStorage.setItem("isAdmin", "true")
            localStorage.setItem("logined", "true")
            navigate("/account")
        } else {
            if (state === "login" || state === "signup") {
                localStorage.setItem("logined", "true")
                navigate("/account")
            } else {
                navigate("/")
            }
        }
    }
    return (
        <section className="Authorization" >
            <div className="Authorization__container" style={state === "recover" ? { borderRadius: "20px" } : {}}>
                {
                    state !== "recover" ?
                        <div className="Authorization__select">
                            <div onClick={(e) => setState("login")} className={`Authorization__option ${state === "login" ? "Authorization__option_selected" : ""}`}>Вхід</div>
                            <div onClick={(e) => setState("signup")} className={`Authorization__option ${state === "signup" ? "Authorization__option_selected" : ""}`}>Реєстрація</div>
                        </div> : ""
                }
                {state === "recover" ? <h2 className="Authorization__headline">Відновлення паролю</h2> : ""}
                {
                    state === "signup" ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Ім’я</div>
                            <input type="text" className="Authorization__input" />
                        </div>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Прізвище</div>
                            <input type="text" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <div className="Authorization__input-wrap">
                    <div className="Authorization__input-label">E-Mail</div>
                    <input ref={input} type="text" className="Authorization__input" />
                </div>
                {
                    state !== "recover" ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Пароль</div>
                        <input type="password" className="Authorization__input" />
                    </div> : ""
                }
                {
                    state === "signup" ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Пароль ще раз</div>
                            <input type="password" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <button onClick={actionHandler} className="Authorization__action">{state === "login" ? "Вхід" : state === "signUp" ? "Зареєструватися" : "Відправити"}</button>
                <div onClick={(e) => setState("recover")} className="Authorization__recover">Забули пароль?</div>
            </div>
        </section>
    )
}

export default Authorization