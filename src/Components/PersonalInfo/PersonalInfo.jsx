import "./Styles/PersonalInfo.css"
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function PersonalInfo({ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let [editorData, setEditorData] = useState({ ...userData, password: "", confirmPassword: "" });
    let go = useNavigate();
    const isDataChanged = JSON.stringify(editorData) !== JSON.stringify({ ...userData, password: "", confirmPassword: "" });

    let resetHandler = () => {
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

    let handleSave = () => {
        let changedFields = Object.keys(editorData).filter(key => editorData[key] !== userData[key]).filter(key => key !== "password" && key !== "confirmPassword");
        let data = {}
        if (changedFields.length > 0 && isDataChanged) {
            for (let key of changedFields) {
                data[key] = editorData[key]
            }
            if (editorData.password.length > 0) {
                if (editorData.password === editorData.confirmPassword) {
                    data.password = editorData.password
                } else {
                    setAlertData({ delay: 0, show: true, message: "Passwords do not match!", actionCaption: "Close", action: () => { }, close: () => setAlertData({ ...alertData, show: false }) })
                    return
                }
            }
        } else {
            if (editorData.password.length > 0) {
                if (editorData.password === editorData.confirmPassword) {
                    data.password = editorData.password
                } else {
                    setAlertData({ delay: 0, show: true, message: "Passwords do not match!", actionCaption: "Close", action: () => { }, close: () => setAlertData({ ...alertData, show: false }) })
                    return
                }
            } else {
                setAlertData({ delay: 0, show: true, message: "Cannot save information.\nNo changes detected.", actionCaption: "Close", action: () => { }, close: () => setAlertData({ ...alertData, show: false }) })
                return
            }
        }

        SERVER("Saving...", "POST", "auth/change-user-data", "application/json", data, getCookie("userToken")).then(data => {
            // TRANSLATION UPDATE: Check for English success message
            if (data.message.includes('Data changed successfully')) {
                SERVER("Saving...", "GET", "auth/get-info", "application/json", "", getCookie("userToken")).then(data => {
                    if (data.body) {
                        if (data.body.verified) {
                            setUserData(data.body)
                            setEditorData({ ...data.body, password: "", confirmPassword: "" });
                            sessionStorage.setItem("userData", JSON.stringify(data.body))
                        } else {
                            setUserData(undefined);
                            sessionStorage.clear();
                            setCookie("userToken", "", 0)
                        }
                    }

                    setAlertData({
                        delay: 0.9,
                        show: true,
                        // TRANSLATION UPDATE: Check for English server error
                        message: data.message === "ok" ? `Data updated successfully! ${changedFields.includes("email") ? "Please verify your new email address. A confirmation email has been sent." : ""}` : (data.message === "Server error" && data.errorMessage === "Invalid token") ? "Your session has expired. Please log in again." : data.message,
                        actionCaption: (data.message === "Server error" && data.errorMessage === "Invalid token") ? "Log in" : "OK",
                        action: () => (data.message === "Server error" && data.errorMessage === "Invalid token") ? () => {
                            setUserData(undefined);
                            sessionStorage.removeItem("userData")
                            setCookie("userToken", "", 0)
                            go("/authorization")
                        } : () => { },
                        close: () => setAlertData({ ...alertData, show: false })
                    })
                })
            } else {
                setAlertData({
                    delay: 0.9,
                    show: true,
                    // TRANSLATION UPDATE: Check for English server error
                    message: (data.message === "Server error" && data.errorMessage === "Invalid token") ? "Your session has expired. Please log in again." : data.message,
                    actionCaption: (data.message === "Server error" && data.errorMessage === "Invalid token") ? "Log in" : "Close",
                    action: () => (data.message === "Server error" && data.errorMessage === "Invalid token") ? () => {
                        setUserData(undefined);
                        go("/authorization")
                    } : () => { },
                    close: () => setAlertData({ ...alertData, show: false })
                })
            }
        })
    }
    return (
        <div className="PersonalInfo">
            <h2 className="PersonalInfo__headline">Personal Information</h2>
            <div className="PersonalInfo__fields">
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Last Name</p>
                        <input onChange={handleChange} name="surname" value={editorData.surname} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">First Name</p>
                        <input onChange={handleChange} name="name" value={editorData.name} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">E-Mail</p>
                        <input onChange={handleChange} name="email" inputMode="email" value={editorData.email} type="text" className="PersonalInfo__input" />
                    </div>
                </div>
                <div className="PersonalInfo__raw">
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Phone Number</p>
                        <input name="phoneNumber" inputMode="tel" onChange={handlePhoneChange} value={phone} type="text" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">New Password</p>
                        <input autoComplete="false" onChange={handleChange} name="password" value={editorData.password} type="password" className="PersonalInfo__input" />
                    </div>
                    <div className="PersonalInfo__input-group">
                        <p className="PersonalInfo__input-label">Confirm Password</p>
                        <input autoComplete="false" onChange={handleChange} name="confirmPassword" value={editorData.confirmPassword} type="password" className="PersonalInfo__input" />
                    </div>
                </div>
            </div>
            <div className="PersonalInfo__btn-container">
                <button className="PersonalInfo__btn" onClick={handleSave}>Save</button>
                {isDataChanged && <button onClick={resetHandler} className="PersonalInfo__btn PersonalInfo__btn_outlined">Reset</button>}
            </div>
        </div>
    )
}

export default PersonalInfo