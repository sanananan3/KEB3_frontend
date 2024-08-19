import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Html } from "@react-three/drei";
import './login.css';
import Swal from "sweetalert2";

export const SignUp = ({ onClose }) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSignUp = async () => {
    if (id.length >= 8 && pw.length >= 8) {

      try {
        const response = await fetch('http://3.36.52.35:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, pw }),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: '회원가입이 완료되었습니다',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              title: 'swal2-title-small',
              text: 'swal2-text-small',
            }
          });
          onClose(); // 회원가입 팝업 닫기
        } else {
          Swal.fire({
            icon: 'error',
            title: '회원가입에 실패하였습니다. 다시 시도해주세요',
            customClass: {
              title: 'swal2-title-small',
              text: 'swal2-text-small',
            }
          });
        }

      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: '서버와 통신 중 오류가 발생하였습니다',
          customClass: {
            title: 'swal2-title-small',
            text: 'swal2-text-small',
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '아이디와 비밀번호는 각 8자 이상이어야 합니다',
        customClass: {
          title: 'swal2-title-small',
          text: 'swal2-text-small',
        }
      });
    }
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
                <input
                  className='input'
                  placeholder='영문 8자 이상의 아이디를 입력하세요'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>

            <div className='contentWrap'>
              <div className='inputWrap'>
                <input
                  className='input'
                  placeholder='영문 8자 이상의 비밀번호를 입력하세요'
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
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
