import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import LoadingPage from './loading_page/LoadingPage';
import MainPage from './main_page/MainPage';
import Home from './map_page/home';
import Map from './map_page/map_page';
import DateView from './dateview_page/dateview_page';
import Popup from "./image_popup/Popup";

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path = "/main" element = {<MainPage />} />
      <Route path="/" element={<LoadingPage />} />
      <Route path="/map_page" element={<Map />} />
      <Route path="/dateview_page" element={<DateView />} />
      <Route path="/popup" element={<Popup />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
