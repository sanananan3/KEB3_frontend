import React, { useState, useEffect } from 'react';
import './popup.css';
import { AiOutlineClose } from "react-icons/ai";
import CustomSelect from './CustomSelect';
import CustomSelectD from './CustomSelectD';
import Swal from "sweetalert2";


const KAKAO_API_KEY = '15f59f6649931def45a278eedf761891'; // 카카오 맵 REST API 키 

const fetchAddressFromCoordinates = async (latitude, longtitude) => {

    try {
        const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longtitude}&y=${latitude}`,
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`
                }
            });

            const data = await response.json();
            if (data.documents && data.documents.length > 0 ){
                const region = data.documents[1];
            
                return {
                    region_1depth_name: region.region_1depth_name, // 시/도
                    region_2depth_name: region.region_2depth_name, // 구/군
                    region_3depth_name: region.region_3depth_name // 동/읍/면
                    
                };
                
                
            } else {
                return '주소를 찾을 수 없습니다';
            }
    } catch (error) {
        console.error('Error fetching address', error);
        return '주소를 찾을 수 없습니다.';
    }
}


export const PopupInside = ({ onClose, image, totalImages, currentIndex }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [damageType, setDamageType] = useState(null);
    const [damageDegree, setDamageDegree] = useState(null);

    const [address, setAddress] = useState(
        {
    
            region_1depth_name:'',
            region_2depth_name:'',
            region_3depth_name:'',
        }
    );

    const damageTypeMap = {
        0: "PE방호벽",
        1: "PE안내봉",
        2: "로드킬",
        3: "도로 요철 균열",
        4: "표지판 파손",
        5: "배수시설 불량", 
        6: "가드레일 파손",
        7: "PE드럼",
        8: "포트홀",
        9: "라바콘",
        10: "시선유도봉",
        11: "낙석",
        12: "노면 균열",
        13: "중앙 분리대", 
        14: "보도블럭 파손",
     
    };

    const reverseDamageTypeMap = Object.fromEntries(
        Object.entries(damageTypeMap).map(([key, value]) => [value, key])
    );

    const fetchClassificationResult = async (index) => {

        try {
            
            const response = await fetch(`http://3.36.52.35:8000/images/${image[index].id}`);
            const data = await response.json();
            const classificationResult = parseInt(data.classification_result, 10);
            setDamageType(damageTypeMap[classificationResult]); // DB에서 가져온 값 설정

            // 여기는 파손 정도 불러오기.. 

            const degreeResponse = await fetch(`http://3.36.52.35:8000/getDetails`);
            const degreeData = await degreeResponse.json();

            // 현재 이미지 id와 일치하는 image-id를 가진 데이터 찾기.. 
            const matchingDegree = degreeData.find(degree=> degree.image_id === image[index].id);

            // 파손 정도 설정 

            if (matchingDegree && matchingDegree.details) {
                console.log('들어왔따');
                setDamageDegree(matchingDegree.details); // default 값으로 띄우기 
            }
            else{
                console.log(image[index].id);
                console.log("degreedata", degreeData, degreeResponse);
                console.log("matching.. ", matchingDegree);
                console.log('들어왔따 여기에');

                setDamageDegree(null); // 없을 경우 null => place holder 띄우기 
            }

            if(data.gps && data.gps.length > 0) {
                const {latitude, longitude} = data.gps[0];
                const addressData = await fetchAddressFromCoordinates(latitude, longitude);
                setAddress(addressData);
          }
            else {
                setAddress('GPS 정보가 없습니다');
            }
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

            const response = await fetch('http://3.36.52.35:8000/maintenance-schedule', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {

                Swal.fire({
                    icon: 'success',
                    title: '변경된 정보가 저장되었습니다',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      title: 'swal2-title-small',
                    }
                  });
          
              //   alert('변경된 정보가 저장되었습니다');
              //   console.log('image_id',image[currentImageIndex].id );
                onClose();
            } else {
                const errorData = await response.json();
                console.log("Error details:", errorData);

                Swal.fire({
                    icon: 'error',
                    title: '저장에 실패하였습니다',
                    customClass: {
                      title: 'swal2-title-small',
                    }
                  });
              //   alert('저장에 실패하였습니다');
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
                            <div className='imageinfo_content'>  <p> 파손 장소</p></div>  
                            <p>     <span className='depth-item'>{address.region_1depth_name}</span>
                                    <span className='depth-item'>{address.region_2depth_name}</span>
                                    <span className='depth-item'>{address.region_3depth_name}</span></p> 
                        </div>
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
                                defaultValue={damageDegree}
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
