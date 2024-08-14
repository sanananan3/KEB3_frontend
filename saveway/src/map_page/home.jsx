import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToMapPage = () => {
    navigate('/map_page');
  };

  const goToDateviewPage = () => {
    navigate('/dateview_page');
  };


  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToMapPage}>Go to Map</button>
      <button onClick={goToDateviewPage}>Go to DateView</button>
    </div>
  );
};

export default Home;
