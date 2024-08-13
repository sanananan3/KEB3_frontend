import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import home_icon from './../assets/home_icon.png';
import map_icon from './../assets/map_icon.png';
import main_logo from './../assets/main_logo.png';
import { UserInfo } from './user_info';
import './layout.css';

export const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const goToHomePage = () => {
        navigate('/');
    };
    
    const goToMap = () => {
        navigate('/map_page');
    };


    const handleLogout = () => {
        console.log('User logged out');
    };

    return (
        <div className='layout-container'>
            {location.pathname === '/map_page' ? (
                <img src={home_icon} alt='home_icon' className='icon' onClick={goToHomePage} />
            ) : (
                <img src={map_icon} alt='map_icon' className='icon' onClick={goToMap} />
            )}
            <img src={main_logo} alt='main_logo' className='main_logo' />
            <UserInfo username="USER NAME" handleLogout={handleLogout} />
            <div className='line'></div>
            <div className='main'>
                <main>{children}</main>
            </div>
        </div>
    );
};
