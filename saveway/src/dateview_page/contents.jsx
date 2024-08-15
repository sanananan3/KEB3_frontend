
import React from 'react';
import './contents.css';
import personIcon from './../assets/person_icon.png';
import DateView from './dateview_page';

const Contents = ({ id, date, userName, photoCount, isEven, onSelect, isSelected, onNavigate }) => {
    // isEven에 따라 배경색 결정
    
    const handleDivClick = (e) => {
        if (e.target.type !== 'checkbox') {
            onNavigate(id);

        }
    };

    const handleCheckboxChange = () => {
        onSelect(id);
    };

    const backgroundColor = isEven ? 'rgba(128, 128, 128, 0.7)' : 'rgba(189, 154, 154, 0.4)';

    return (
        <div className='contents_container' style={{ backgroundColor }} onClick={handleDivClick}>
            <div className='select_box'>
                <div className='date_box'>{date}</div>
                <input
                    type="checkbox"
                    name="select"
                    value="select"
                    checked={isSelected}
                    onChange={handleCheckboxChange} 
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
            <div className='user'>
                <img src={personIcon} alt="User Icon" className='user_icon' />
                {userName}
            </div>
            <div className='photo_num'>
                <p className='star'>☆</p>
                <p className="number">{photoCount}</p>
            </div>
        </div>
    );
};

export { Contents };

