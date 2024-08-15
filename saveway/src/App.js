import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import LoadingPage from './loading_page/LoadingPage';
import MainPage from './main_page/MainPage';
import Home from './map_page/home';
import Map from './map_page/map_page';
import DateView from './dateview_page/dateview_page';
import Popup from "./image_popup/Popup";
import RefinePage from "./image_refine/image_refine_page";

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path = "/main" element = {<MainPage />} />
      <Route path="/" element={<LoadingPage />} />
      <Route path="/map_page" element={<Map />} />
      <Route path="/dateview_page" element={<DateView />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/refine_page" element={<RefinePage />} />
      <Route path="/refine_page/:id" element={<RefinePage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
