import React from 'react';
import csv_download from './../assets/csv download.png';
import './csv_download.css';

const Csv = () => {

  return (
    <div>
      <img src={csv_download} alt='csv_download' className='csv'/>
    </div>
  );
};

export {Csv};
