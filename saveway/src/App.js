import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import LoadingPage from './loading_page/LoadingPage';
import MainPage from './main_page/MainPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/loading" element = {<LoadingPage/>} />
      <Route path = "/main" element = {<MainPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
