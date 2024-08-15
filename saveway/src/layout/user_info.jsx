import React from 'react';
import { useNavigate } from 'react-router-dom';
import logout_button from './../assets/logout.png';
import user_button from './../assets/user.png';
import logout_icon from './../assets/logout_icon.png';
import './user_info.css';
import './../styles/fonts.css';
import { useUser } from '../UserProvider';

const UserInfo = ({ handleLogout }) => {

    const navigate = useNavigate();
    const { user } = useUser();

    const handleLogoutClick = () => {
        if (handleLogout) {
            handleLogout();
        }
        navigate('/');
    };

    return (
        <div className="user_info_container" onClick={handleLogoutClick}>
        
            <img
                src={logout_button} 
                alt="left_box" 
                className="box_image" 
            />
            <div className="logout_section">

                <img 
                    src={logout_icon} 
                    alt="logout_icon" 
                    className="button_icon" 
                />
                <span className="button_text">LOGOUT</span>
            </div>

        
            <img 
                src={user_button} 
                alt="right_box" 
                className="box_image" 
            />
            <div className="user_section" >
                <span className="button_text user_text">{user}</span>
            </div>



            
        </div>
    );
};

export { UserInfo };
