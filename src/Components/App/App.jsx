import './Styles/App.css';

import Home from "../Home/Home"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneMenu from '../PhoneMenu/PhoneMenu';
import Account from '../Account/Account';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react"

function App() {
  let [change, triggerChange] = useState(false)
  return (
    <Router>
      <div className="App" style={{ backgroundColor: window.location.href.includes("/search") ? "#ECECEC" : "#FFFFFF" }}>
        <Header />
        <Routes>
          <Route path='/*' element={<Home {...{change, triggerChange}} />} />
          <Route path='account/*' element={<Account />} />
        </Routes>
        <PhoneMenu />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
