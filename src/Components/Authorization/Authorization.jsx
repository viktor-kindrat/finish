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
                console.log("Auth form error")
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
                    state === "recover" ? <button onClick={backHandler} className="Authorization__action Authorization__action_outline">&#8592; Back</button> : ""
                }
                {
                    (state !== "recover" && state !== "edit") ?
                        <div className="Authorization__select">
                            <div onClick={(e) => setState("login")} className={`Authorization__option ${state === "login" ? "Authorization__option_selected" : ""}`}>Log in</div>
                            <div onClick={(e) => setState("signup")} className={`Authorization__option ${state === "signup" ? "Authorization__option_selected" : ""}`}>Sign up</div>
                        </div> : ""
                }
                {state === "recover" ? <h2 className="Authorization__headline">Password recovery</h2> : ""}
                {
                    (state === "signup" || state === "edit") ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">First Name</div>
                            <input value={userData.name} onChange={handleChange} name="name" type="text" className="Authorization__input" />
                        </div>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Last Name</div>
                            <input value={userData.surname} onChange={handleChange} name="surname" type="text" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <div className="Authorization__input-wrap">
                    <div className="Authorization__input-label">E-Mail</div>
                    <input value={userData.email} inputMode="email" onChange={handleChange} name="email" type="text" className="Authorization__input" />
                </div>
                {
                    (state === "signup" || state === "edit") ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Phone Number</div>
                        <input value={userData.phoneNumber} inputMode="tel" onChange={handlePhoneChange} name="phoneNumber" type="text" className="Authorization__input" />
                    </div> : ""
                }
                {
                    state !== "recover" ? <div className="Authorization__input-wrap">
                        <div className="Authorization__input-label">Password</div>
                        <input value={userData.password} onChange={handleChange} name="password" type="password" className="Authorization__input" />
                    </div> : ""
                }
                {
                    (state === "signup" || state === "edit") ? <>
                        <div className="Authorization__input-wrap">
                            <div className="Authorization__input-label">Confirm Password</div>
                            <input value={userData.confirmPassword} onChange={handleChange} name="confirmPassword" type="password" className="Authorization__input" />
                        </div>
                    </> : ""
                }
                <button onClick={actionHandler} className="Authorization__action">{state === "login" ? "Log in" : state === "signup" ? "Sign up" : state === "edit" ? "Save" : "Send"}</button>
                {(state !== "recover" && state !== "edit") ? <div onClick={(e) => setState("recover")} className="Authorization__recover">Forgot password?</div> : ""}
            </div>
        </section>
    )
}

export default Authorization