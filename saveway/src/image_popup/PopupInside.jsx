import React, { useState, useEffect } from 'react';
import './popup.css';
import { AiOutlineClose } from "react-icons/ai";
import CustomSelect from './CustomSelect';
import CustomSelectD from './CustomSelectD';

export const PopupInside = ({ onClose, image, totalImages, currentIndex }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [damageType, setDamageType] = useState(null);
    const [damageDegree, setDamageDegree] = useState(null);

    const damageTypeMap = {
        0: "PE방호벽",
        1: "PE안내봉",
        2: "PE드럼",
        3: "포트홀",
        4: "라바콘",
        5: "시선유도봉"
    };

    const reverseDamageTypeMap = Object.fromEntries(
        Object.entries(damageTypeMap).map(([key, value]) => [value, key])
    );

    const fetchClassificationResult = async (index) => {
        try {
            const response = await fetch(`http://3.39.6.45:8000/images/${image[index].id}`);
            const data = await response.json();
            const classificationResult = parseInt(data.classification_result, 10);
            setDamageType(damageTypeMap[classificationResult]); // DB에서 가져온 값 설정
            setDamageDegree(null);  // 새로운 이미지로 변경될 때 damageDegree 초기화
        } catch (error) {
            console.error("Error fetching classification result", error);
        }
    };

    useEffect(() => {
        fetchClassificationResult(currentImageIndex);
    }, [currentImageIndex, image]);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % totalImages;
            fetchClassificationResult(newIndex); // Index가 변경될 때마다 데이터 fetch
            return newIndex;
        });
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + totalImages) % totalImages;
            fetchClassificationResult(newIndex); // Index가 변경될 때마다 데이터 fetch
            return newIndex;
        });
    };

    const handleSave = async () => {
        // null 또는 undefined 체크

        try {

            const formData = new FormData();
            formData.append('image_id', image[currentImageIndex].id);
            formData.append('schedule_date', new Date().toISOString());
            formData.append('classification_result', reverseDamageTypeMap[damageType]);
            formData.append('details', damageDegree);

            const response = await fetch('http://3.39.6.45:8000/maintenance-schedule', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('변경된 정보가 저장되었습니다');
                console.log('image_id',image[currentImageIndex].id );
            } else {
                const errorData = await response.json();
                console.log("Error details:", errorData);
                alert('저장에 실패하였습니다');
            }
        } catch (error) {
            console.error('Error saving maintenance schedule', error);
            alert('저장 중 오류가 발생했습니다');
        }
    };
    
    return (
        <div className="ImageWrap">
            <div className="ImageContent">
                <div className='navigate_before' onClick={handlePrevious}>
                    <img src='/navigate_before_3.png' alt="navigate_before" />
                </div>

                <div className="close-button">
                    <AiOutlineClose onClick={onClose} size={18} />
                </div>

                <div className="image-container">
                    <div className='image-number'>
                        <p>{currentImageIndex + 1} </p> <p>/</p> <p> {totalImages} </p>
                    </div>

                    <div className='image-line'></div>

                    <div className='images'>
                        <img src={image[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} />
                    </div>
                </div>

                <div className='image_info'>
                    <div className='image_info_name'>
                        <p>이미지 정보</p>
                    </div>

                    <div className="image_info_container">
                        <div className='imageinfo_wrap'>
                            <div className='imageinfo_content'>  <p> 업로드 날짜</p>
                            </div> <p>{image[currentImageIndex].date}</p> </div>

                        <div className='imageinfo_wrap'>
                            <div className='imageinfo_content'>  <p> 파손 장소</p>
                            </div>  <p>{image[currentImageIndex].gpsLocation}</p> </div>
                    </div>

                    <div className='damage_type'>
                        <div className='damage_type_label'>
                            <p>파손 종류</p>
                            <CustomSelect 
                                defaultValue={damageType}
                                onChange={(selectedOption) => setDamageType(selectedOption.value)} 
                            />
                        </div>
                    </div>

                    <div className='damage_degree'>
                        <div className='damage_degree_label'>
                            <p>파손 정도</p>
                            <CustomSelectD 
                                placeholder="파손 정도를 선택하세요" 
                                onChange={(selectedOption) => setDamageDegree(selectedOption.value)} 
                            />
                        </div>
                    </div>

                    <div className='save_button' onClick={handleSave}>
                        <img src='/save_button.png' alt='save_button' />
                    </div>
                </div>

                <div className='navigate_after' onClick={handleNext}>
                    <img src='/navigate_after_3.png' alt='navigate_after' />
                </div>
            </div>
        </div>
    );
};
