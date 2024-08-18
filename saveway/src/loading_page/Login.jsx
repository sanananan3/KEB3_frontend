// Login 팝업

import React, {useState} from 'react';
import { AiOutlineClose} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {Html, useAnimations} from "@react-three/drei";
import './login.css';
import { useUser } from '../UserProvider';


export const Login = ({ onClose, onSignUp }) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { setUser } = useUser(); // userContext에서 setUser 함수 가져오기 

  const handleLogin = async () => {

    // login 로직

    try {
      const response = await fetch ('http://13.124.159.202:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({id, pw}), // 로그인에 필요한 데이터 전송
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();

      console.log("result", result.success);

      if (result) {
        alert('로그인에 성공했습니다');
        setUser(id); // 로그인한 사용자 id를 상태에 저장 
        navigate('/main');
      }

      else {

        alert ('로그인 정보가 일치하지 않습니다');
        setId('');
        setPw('');
      }
    }
    catch(error) {
      console.error('Error:', error);
      alert('서버와 통신 중 오류가 발생했습니다');
    }

  };

  const handleSignUp = () => {

    if (onSignUp) {
      onSignUp();

    }
  };



    return (

    <Html center>

    <div className="login-overlay" >
      <div className="login-container">
        <div className="close-button">
          <AiOutlineClose onClick={onClose} />
        </div>

      <div className = "header">
        <img src = "/saveway_final_logo_2.png" alt="saveway logo" className="logo"/>
        </div>

      {/* Body */ }



      <div className="login-body">

        <div className="contentWrap">
          <div className="inputWrap">
            <input className='input' placeholder='아이디를 입력하세요'
            value={id} onChange={(e) => setId(e.target.value)}></input>
          </div>
        </div>


      <div className='contentWrap'>
        <div className='inputWrap'>
          <input className='input' placeholder='패스워드를 입력하세요' type="password"
          value={pw} onChange={(e) => setPw(e.target.value)}></input>
        </div>
      </div>


        <div className='button-group'>

        <div className= "button-container" onClick={handleLogin}>
            <h3> Log In </h3>
        </div>

        <div className="button-container" onClick={handleSignUp}> 
        <h3> Sign Up </h3>
        </div>

        </div>
      </div>
    </div>
</div>

</Html>
    );
};
