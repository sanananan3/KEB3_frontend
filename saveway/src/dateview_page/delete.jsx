import React from 'react';
import delete_icon from './../assets/delete.png';
import './delete.css';

const Delete = () => {

  return (
    <div className='delete'>
      <img src={delete_icon} alt='delete' />
    </div>
  );
};

export {Delete};
