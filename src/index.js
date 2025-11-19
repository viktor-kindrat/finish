import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import './CoreStyles/index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import HostNameContext from './Context/ServerHostnameContext';
import APIkeysContext from "./Context/APIkeysContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
const serverUrl = process.env.REACT_APP_SERVER_URL;
const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

root.render(
  <React.StrictMode>
    <Router>
      <APIkeysContext.Provider value={{ googleMaps:googleMapsKey }}>
        <HostNameContext.Provider value={{server: serverUrl}}>
          <App />
        </HostNameContext.Provider>
      </APIkeysContext.Provider>
    </Router>
  </React.StrictMode>
);

