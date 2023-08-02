import './Styles/App.css';

import Home from "../Home/Home"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneMenu from '../PhoneMenu/PhoneMenu';
import Account from '../Account/Account';
import Authorization from '../Authorization/Authorization';

import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react";

function App() {
  let [change, triggerChange] = useState(false);
  // let [userData, setUserData] = useState(sessionStorage.getItem("userData") || {});
  let [authUserData, setAuthUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  })

  // if (Object.keys(userData).length === 0) {
  //   console.log("ok")
  // }
  let location = useLocation();
  return (

    <div className="App" style={{ backgroundColor: location.path === "/" ? "#FFFFFF" : "#ECECEC" }}>
      <Header />
      <Routes>
        <Route path='/*' element={<Home {...{ change, triggerChange }} />} />
        <Route path='account/*' element={<Account />} />
        <Route path='authorization/*' element={<Authorization userData={authUserData} setUserData={setAuthUserData} isEdit={false} handleLogin={() => { }} handleSignUp={() => { }} handleRecover={() => { }} handleEdit={() => { }} />} />
      </Routes>
      <PhoneMenu />
      <Footer />
    </div>

  );
}

export default App;
