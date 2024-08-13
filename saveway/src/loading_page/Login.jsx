// Login 팝업

import React, {useState} from 'react';
import { AiOutlineClose} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {Html, useAnimations} from "@react-three/drei";
import './login.css';


export const Login = ({onClose}) => {

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = () => {

    // login 로직 추가하기 ... 
    navigate('/main');

  };



    return (

    <Html center>

    <div className="login-overlay" >
      <div className="login-container">
        <div className="close-button">
          <AiOutlineClose onClick={onClose} />
        </div>

      <div className = "header">
        <img src = "/saveway_logo.png" alt="saveway logo" className="logo" />
        </div>

      {/* Body */ }



      <div className="login-body">

        <div className="contentWrap">
          <div className="inputWrap">
            <input className='input' placeholder='아이디를 입력하세요'></input>
          </div>
        </div>


      <div className='contentWrap'>
        <div className='inputWrap'>
          <input className='input' placeholder='패스워드를 입력하세요' type="password"></input>
        </div>
      </div>


        <div className='button-group'>

        <div className= "button-container" onClick={handleLogin}>
            <h3> Log In </h3>
        </div>

        <div className="button-container"> 
        <h3> Sign Up </h3>
        </div>

        </div>
      </div>
    </div>
</div>

</Html>
    );
};
