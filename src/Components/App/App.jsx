import './Styles/App.css';

import Home from "../Home/Home";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneMenu from '../PhoneMenu/PhoneMenu';
import Account from '../Account/Account';
import Authorization from '../Authorization/Authorization';
import Loader from '../UI/Loader/Loader';
import Alert from '../UI/Alert/Alert';
import Modal from '../UI/Modal/Modal';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useCallback } from "react";

import hrefContext from "../../Context/ServerHostnameContext";

function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

function App() {
    let location = useLocation();
    let go = useNavigate();

    let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")) || undefined)
    let [authUserData, setAuthUserData] = useState({ name: "", surname: "", email: "", phoneNumber: "", password: "", confirmPassword: "" });

    let server = useContext(hrefContext).server;
    let TOKEN = getCookie("userToken");

    let [loaderData, setLoaderData] = useState({ shown: false, loaderText: "Loading..." })
    let [alertData, setAlertData] = useState({ delay: 0, show: false, message: "Success!", actionCaption: "Close", action: () => { } })
    let [modalData, setModalData] = useState({ delay: 0, show: false, message: "Confirm?", confirmCaption: "Yes", rejectCaption: "No", confirmAction: () => { }, rejectAction: () => { }, })

    let SERVER = useCallback((loaderText, method, path, contentType, data, token) => {
        setLoaderData({ shown: true, loaderText: loaderText })
        const options = { method, headers: { Authorization: token ? `Baerer ${token}` : "", } };
        if (method === "POST") {
            options.headers["Content-type"] = contentType;
            options.body = JSON.stringify(data);
        }

        return fetch(`${server}${path}`, options).then((res) => res.json()).then((data) => {
            setLoaderData({ loaderText: loaderText, shown: false });
            return data
        }).catch((e) => console.log(e))
    }, [server]);


    useEffect(() => {
        if (TOKEN.length > 0 && !userData) {
            SERVER("Loading user data...", "GET", "auth/get-info", "application/json", "", TOKEN).then(data => {
                if (data.body) {
                    if (data.body.verified) {
                        setUserData(data.body)
                        sessionStorage.setItem("userData", JSON.stringify(data.body))
                    }
                } else {
                    setCookie("userToken", "", 0)
                }
            });
        }
    }, [SERVER, TOKEN, userData])

    let setUserDataAndToken = (token) => {
        setCookie("userToken", token, 1)

        SERVER("Retrieving data...", "GET", "auth/get-info", "application/json", "", token).then(data => {
            if (data) {
                setUserData(data.body)
                sessionStorage.setItem("userData", JSON.stringify(data.body))
            }
        });
    }

    let handleLogin = () => {
        let data = {
            email: authUserData.email,
            password: authUserData.password
        };

        let notEmpty = Object.keys(data).map(key => data[key].length <= 0 ? "yes" : null).filter(item => item !== null).length === 0;
        if (notEmpty) {
            setCookie("userToken", "", 0)
            SERVER("Logging in...", "POST", "auth/login", "application/json", data).then(data => {
                if (data.token) {
                    setCookie("userToken", data.token, 1);
                    if (data.userVerified) {
                        setUserDataAndToken(data.token)
                        setAlertData({ 
                            delay: 0.9, 
                            show: true, 
                            message: data.message,
                            actionCaption: data.message === "Ви успішно увійшли" ? "My Account" : "Close", 
                            action: data.message === "Ви успішно увійшли" ? () => go("/account") : () => { } 
                        })
                    } else {
                        setModalData({
                            delay: 0.9,
                            show: true,
                            message: data.message,
                            confirmCaption: data.message.includes("не активовано") ? "Yes" : "Got it",
                            rejectCaption: data.message.includes("не активовано") ? "No" : "Close",
                            confirmAction: data.message.includes("не активовано") ? () => {
                                SERVER("Sending email...", "POST", "auth/confirm-account", "application/json", {}, data.token).then(data => {
                                    if (data.message) {
                                        setAlertData({ delay: 0.9, show: true, message: data.message, actionCaption: "Got it", action: () => go("/") })
                                    } else {
                                        setAlertData({ delay: 0.9, show: true, message: "Unexpected error! Please try again.", actionCaption: "OK", action: () => { } })
                                    }
                                })
                            } : () => { },
                            rejectAction: () => { }
                        })
                    }
                } else {
                    setAlertData({ delay: 0.9, show: true, message: data.message, actionCaption: "Got it", action: () => { } })
                }
            })
        }
    }


    let handleSignUp = () => {
        let data = {
            name: authUserData.name,
            surname: authUserData.surname,
            email: authUserData.email,
            phoneNumber: authUserData.phoneNumber,
            password: authUserData.password
        };

        let passwordsMathces = authUserData.password === authUserData.confirmPassword;
        let notEmpty = Object.keys(data).map(key => data[key].length <= 0 ? "yes" : null).filter(item => item !== null).length === 0;

        if (notEmpty && passwordsMathces) {
            setCookie("userToken", "", 0)
            SERVER("Registering...", "POST", "auth/sign-up", "application/json", data).then(data => { 
                setAlertData({ delay: 0.9, show: true, message: data.message, actionCaption: "Close", action: () => { } }) 
            })
        }
    }

    let handleRecover = () => {
        let data = {
            email: authUserData.email
        };

        let notEmpty = Object.keys(data).map(key => data[key].length <= 0 ? "yes" : null).filter(item => item !== null).length === 0;

        if (notEmpty) {
            SERVER("Sending email...", "POST", "auth/reset-password", "application/json", data).then(data => {
                setAlertData({ 
                    delay: 0.9, 
                    show: true, 
                    message: data.message, 
                    actionCaption: data.message === "Посилання для скидання паролю було надіслано на ваш e-mail!" ? "Home" : "Got it", 
                    action: data.message === "Посилання для скидання паролю було надіслано на ваш e-mail!" ? () => go("/") : () => { } 
                })
            })
        }
    }

    return (
        <div className="App" style={{ backgroundColor: location.path === "/" ? "#FFFFFF" : "#ECECEC" }}>
            <Loader {...{ ...loaderData }} />
            <Alert {...{ ...alertData }} close={() => setAlertData({ ...alertData, show: false })} />
            <Modal {...{ ...modalData }} close={() => setModalData({ ...modalData, show: false })} />
            <Header {...{ alertData, setAlertData }} />
            <Routes>
                <Route path='/*' element={<Home {...{ userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }} />} />
                <Route path='account/*' element={<Account {...{ setModalData, modalData, getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }} />} />
                <Route path='authorization/*' element={<Authorization logined={!(!userData)} {...{ handleLogin, handleSignUp, handleRecover }} userData={authUserData} setUserData={setAuthUserData} isEdit={false} />} />
            </Routes>
            <PhoneMenu {...{ userData }} />
            <Footer />
        </div>
    );
}

export default App;