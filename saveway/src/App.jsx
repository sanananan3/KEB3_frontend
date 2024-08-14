import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './map_page/home';
import Map from './map_page/map_page';
import DateView from './dateview_page/dateview_page';

function App() {

  return (

      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map_page" element={<Map />} />
            <Route path="/dateview_page" element={<DateView />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;


