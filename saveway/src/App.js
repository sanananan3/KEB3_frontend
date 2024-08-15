import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import { UserProvider } from "./UserProvider";
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
    <UserProvider>
    <Routes>
      <Route path="/" element={<LoadingPage />} /> 
      <Route path = "/main" element = {<MainPage />} />
      <Route path="/map_page" element={<Map />} />
      <Route path="/dateview_page" element={<DateView />} />
      <Route path="/refine_page" element={<RefinePage />} />
      <Route path="/refine_page/:id" element={<RefinePage />} />
    </Routes>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
