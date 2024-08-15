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
                <input className='input' placeholder='영문 8자 이상의 아이디를 입력하세요 '></input>
              </div>
            </div>

            <div className='contentWrap'>
              <div className='inputWrap'>
                <input className='input' placeholder='영문 8자 이상의 비밀번호를 입력하세요' type="password"></input>
              </div>
            </div>

            <div className='contentWrap'>
              <div className='inputWrap'>
                <input className='input' placeholder='닉네임을 입력하세요' type="password"></input>
              </div>
            </div>

            <div className='button-group'>
              <div className="save-container" onClick={handleSignUp}>
                <h3>계정 생성하기</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
