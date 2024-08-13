import React from 'react';
import delete_icon from './../assets/delete.png';
import './delete.css';

const Delete = ({ onDelete }) => {

  return (
    <div className='delete' onClick={onDelete}>
      <img src={delete_icon} alt='delete' />
    </div>
  );
};

export { Delete };
