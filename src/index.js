import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import './CoreStyles/index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import HostNameContext from './Context/ServerHostnameContext';
import APIkeysContext from "./Context/APIkeysContext"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <APIkeysContext.Provider value={{ googleMaps: "AIzaSyA2w4bmkINSc8U15MEX543BLZmlSp5GPlI" }}>
        <HostNameContext.Provider value={{server: "https://www.group-aliance.fun/"}}>
          <App />
        </HostNameContext.Provider>
      </APIkeysContext.Provider>
    </Router>
  </React.StrictMode>
);

