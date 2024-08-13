
// import React from 'react';
// import './contents.css';
// import personIcon from './../assets/person_icon.png';

// const Contents = ({ date, userName, photoCount, isEven }) => {
//     // isEven에 따라 배경색 결정
//     const backgroundColor = isEven ? 'rgba(128, 128, 128, 0.7)' : 'rgba(189, 154, 154, 0.4)';

//     return (
//         <div className='contents_container' style={{ backgroundColor }}>
//             <div className='select_box'>
//                 <div className='date_box'>{date}</div>
//                 <input type="checkbox" name="select" value="select" />
//             </div>
//             <div className='user'>
//                 <img src={personIcon} alt="User Icon" className='user_icon' />
//                 {userName}
//             </div>
//             <div className='photo_num'>
//                 <p className='star'>☆</p>
//                 <p className="number">{photoCount}</p>
//             </div>
//         </div>
//     );
// };

// export { Contents };

import React from 'react';
import './contents.css';
import personIcon from './../assets/person_icon.png';

const Contents = ({ id, date, userName, photoCount, isEven, onSelect, isSelected }) => {
    // isEven에 따라 배경색 결정
    const backgroundColor = isEven ? 'rgba(128, 128, 128, 0.7)' : 'rgba(189, 154, 154, 0.4)';

    return (
        <div className='contents_container' style={{ backgroundColor }}>
            <div className='select_box'>
                <div className='date_box'>{date}</div>
                <input
                    type="checkbox"
                    name="select"
                    value="select"
                    checked={isSelected}
                    onChange={() => onSelect(id)}
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

