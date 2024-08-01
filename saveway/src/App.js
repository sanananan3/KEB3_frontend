import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import LoadingPage from './loading_page/LoadingPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/loading" element = {<LoadingPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
