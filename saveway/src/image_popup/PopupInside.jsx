import React from 'react';
import './popup.css';
import { AiOutlineClose } from "react-icons/ai";
import CustomSelect from './CustomSelect';

export const PopupInside = ({ onClose }) => {
    return (
        <div className="ImageWrap">

            <div className="ImageContent">
                
          
       
                <div className='navigate_before'>
                    <img src = '/navigate_before_3.png' alt = "navigate_before" />
                </div>

      
                <div className="close-button">
                    <AiOutlineClose onClick={onClose} size={18} />
                </div>

                <div className="image-container">
                    <div className='image-number'>
                        <p>1</p> <p>/</p> <p> 32</p>
                    </div>

                    <div className='image-line'></div>

                    <div className='images'>
                        {/* 이미지 컨텐츠 => 데이터베이스에서 가져오기 */}
                        <img src = '/saveway_logo.png' alt='saveway_logo' />
                    </div>



                </div>

                <div className='image_info'>
                    <div className='image_info_name'>
                        <p>이미지 정보</p>
                    </div>

                    <div className="image_info_container">
                        <div className='imageinfo_wrap'>
                       <div className='imageinfo_content'> <p> 담당자 </p></div>
                       <p>정지연</p> </div>
                      
                       <div className='imageinfo_wrap'>
                       <div className='imageinfo_content'>  <p> 업로드 날짜</p> 
                       </div> <p>2024-08-14</p> </div>

                       <div className='imageinfo_wrap'>
                       <div className='imageinfo_content'>  <p> 파손 장소</p> 
                       </div>  <p>경기도 성남시 판교동</p> </div>
                    </div>


                    <div className='damage_type'>
                        <div className='damage_type_label'>
                            <p>파손 종류</p>
                            <CustomSelect />
                        </div>
                    </div>

                  <div className='save_button'>
                    <img src='/save_button.png' alt='save_button'></img>
                  </div>
                </div>

                <div className='navigate_after'>
                        <img src='/navigate_after_3.png' alt='navigate_after'/>
                </div>
            </div>
        </div>
    );
};
