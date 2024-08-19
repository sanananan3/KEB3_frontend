import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Html } from "@react-three/drei";
import './login.css';
import { useUser } from '../UserProvider';
import Swal from "sweetalert2";

export const Login = ({ onClose, onSignUp }) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate(); 
  const { setUser } = useUser();

  const handleLogin = async () => {

    try {
      const response = await fetch('http://3.36.52.35:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();

      console.log("result", result.success);

      if (result) {
        Swal.fire({
          icon: 'success',
          title: '로그인에 성공하였습니다',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'swal2-title-small',
            text: 'swal2-text-small',
          }
        });

        setUser(id); 
        navigate('/main');
      } else {
        Swal.fire({
          icon: 'error',
          title: '로그인 정보가 일치하지 않습니다',
          customClass: {
            title: 'swal2-title-small',
            text: 'swal2-text-small',
          }
        });

        setId('');
        setPw('');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: '서버와 통신 중 오류가 발생했습니다',
        customClass: {
          title: 'swal2-title-small',
          text: 'swal2-text-small',
        }
      });
    }

  };

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    }
  };

  return (
    <Html center>
      <div className="login-overlay">
        <div className="login-container">
          <div className="close-button">
            <AiOutlineClose onClick={onClose} />
          </div>

          <div className="header">
            <img src="/saveway_final_logo_2.png" alt="saveway logo" className="logo" />
          </div>

          <div className="login-body">
            <div className="contentWrap">
              <div className="inputWrap">
                <input
                  className='input'
                  placeholder='아이디를 입력하세요'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>

            <div className='contentWrap'>
              <div className='inputWrap'>
                <input
                  className='input'
                  placeholder='패스워드를 입력하세요'
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </div>
            </div>

            <div className='button-group'>
              <div className="button-container" onClick={handleLogin}>
                <h3>Log In</h3>
              </div>

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
