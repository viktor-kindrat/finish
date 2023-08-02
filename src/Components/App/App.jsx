import './Styles/App.css';

import Home from "../Home/Home";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneMenu from '../PhoneMenu/PhoneMenu';
import Account from '../Account/Account';
import Authorization from '../Authorization/Authorization';
import Loader from '../UI/Loader/Loader';
import Alert from '../UI/Alert/Alert';

import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";

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
	let [change, triggerChange] = useState(false);
	let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")) || undefined)
	let [authUserData, setAuthUserData] = useState({ name: "", surname: "", email: "", phoneNumber: "", password: "", confirmPassword: "" });
	let [loaderData, setLoaderData] = useState({shown: false, loaderText: "Завантаження"})
	let server = useContext(hrefContext).server;
	let TOKEN = getCookie("userToken")

	let SERVER = (loaderText, method, path, contentType, data, token) => {
		setLoaderData({shown: true, loaderText: loaderText})
		const options = { method, headers: { Authorization: token ? `Baerer ${token}` : "", } };
		if (method === "POST") {
			options.headers["Content-type"] = contentType;
			options.body = JSON.stringify(data);
		}

		return fetch(`${server}${path}`, options).then((res) => res.json()).then((data)=>{
			setLoaderData({...loaderData, shown: false}); 
			return data
		}).catch((e) => console.log(e))
	};


	useEffect(() => {
		if (TOKEN.length > 0 && !userData) {
			SERVER("GET", "auth/get-info", "application/json", "", TOKEN).then(data => {
				if (data) {
					setUserData(data.body)
					sessionStorage.setItem("userData", JSON.stringify(data.body))
				}
			});
		}
	})

	let setUserDataAndToken = (token) => {
		setCookie("userToken", token, 1)

		SERVER("Завантажуємо дані", "GET", "auth/get-info", "application/json", "", token).then(data => {
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
			SERVER("Виконуємо вхід", "POST", "auth/login", "application/json", data).then(data => {
				if (data.token) {
					setUserDataAndToken(data.token)
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
			SERVER("Реєструємо", "POST", "auth/sign-up", "application/json", data).then(data => {
				if (data.token) {
					setUserDataAndToken(data.token)
				}
			})
		}
	}

	let handleRecover = () => {
		let data = {
			email: authUserData.email
		};

		let notEmpty = Object.keys(data).map(key => data[key].length <= 0 ? "yes" : null).filter(item => item !== null).length === 0;

		if (notEmpty) {
			SERVER("Надсилаємо e-mail", "POST", "auth/reset-password", "application/json", data).then(data => { console.log(data) })
		}
	}

	return (
		<div className="App" style={{ backgroundColor: location.path === "/" ? "#FFFFFF" : "#ECECEC" }}>
			<Loader {...{...loaderData}} />
			<Header />
			<Routes>
				<Route path='/*' element={<Home {...{ change, triggerChange }} />} />
				<Route path='account/*' element={<Account />} />
				<Route path='authorization/*' element={<Authorization {...{ handleLogin, handleSignUp, handleRecover }} userData={authUserData} setUserData={setAuthUserData} isEdit={false} />} />
			</Routes>
			<PhoneMenu />
			<Footer />
		</div>
	);
}

export default App;
