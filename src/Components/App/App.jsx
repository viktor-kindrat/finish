import './Styles/App.css';

import Home from "../Home/Home"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneMenu from '../PhoneMenu/PhoneMenu';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/*' element={<Home />} />
        </Routes>
      </Router>
      <PhoneMenu />
      <Footer />
    </div>
  );
}

export default App;
