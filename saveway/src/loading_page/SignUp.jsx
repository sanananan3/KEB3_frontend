import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Html } from "@react-three/drei";
import './login.css';

export const SignUp = ({ onClose }) => {

  const handleSignUp = () => {
    // Sign Up 로직 추가하기...
  };

  return (
    <Html center>
      <div className="signup-overlay">
        <div className="signup-container">
          <div className="close-button">
            <AiOutlineClose onClick={onClose} />
          </div>

          <div className="header">
            <img src="/saveway_final_logo_2.png" alt="saveway logo" className="logo" />
          </div>

          <div className="signup-body">
            <div className="contentWrap">
              <div className="inputWrap">
                <input className='input' placeholder='머지? '></input>
              </div>
            </div>

            <div className='contentWrap'>
              <div className='inputWrap'>
                <input className='input' placeholder='패스워드를 입력하세요' type="password"></input>
              </div>
            </div>

            <div className='button-group'>
              <div className="button-container" onClick={handleSignUp}>
                <h3>Sign Up</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
