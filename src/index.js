import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import './CoreStyles/index.css';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// API KEY FOR GOOGLE MAPS IS:  AIzaSyA2w4bmkINSc8U15MEX543BLZmlSp5GPlI
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

