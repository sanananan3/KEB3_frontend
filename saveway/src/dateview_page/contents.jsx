import React from 'react';
import './contents.css';
import personIcon from './../assets/person_icon.png'; 

const Contents = () => {

    return (
        <div className='contents_container'>
            <div className='select_box'>
                <div className='date_box'>2024-08-13</div>
                <input type="checkbox" name="select" value="select" />
            </div>
            <div className='user'>
                <img src={personIcon} alt="User Icon" className='user_icon' />
                user_name
            </div>
            <div className='photo_num'>
                <p className='star'>☆</p>
                <p>3</p>
            </div>
        </div>
    );
};

export { Contents };