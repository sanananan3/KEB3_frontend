import React, { useEffect, useState } from 'react';
import reset from '../../assets/reset.png'; 
import './kakaomap.css';
import '../../styles/fonts.css';
import { FilterBox } from './filterbox';

const { kakao } = window;

const damageTypeMap = {
    "0": "PE방호벽",
    "1": "PE안내봉",
    "2": "로드킬",
    "3": "도로 요철 균열",
    "4": "표지판 파손",
    "5": "배수시설 불량",
    "6": "가드레일 파손",
    "7": "PE드럼",
    "8": "포트홀",
    "9": "라바콘",
    "10": "시선유도봉",
    "11": "낙석",
    "12": "노면 균열",
    "13": "중앙 분리대",
    "14": "보도블럭 파손",
};


function KakaoMap({ searchPlace }) {
    const [markersData, setMarkersData] = useState([]);
    const [infowindows, setInfowindows] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({damageParts: [], damageLevels: []});

    // 데이터베이스에서 마커 데이터를 가져오는 함수
    useEffect(() => {
        async function fetchMarkers() {
            try {
                const response = await fetch('http://3.36.52.35:8000/images/total');
                const totalData = await response.json();
                const imageIds = totalData.total_images.map(image => image.id);

                // 일단 전체 details 데이터 가져오기 
                const detailsRes = await fetch('http://3.36.52.35:8000/getDetails');
                const detailsArray = await detailsRes.json();

                const markerPromises = imageIds.map(async (id) => {

                    // 이미지 데이터 가져오기 (gps, classification 결과 등 )
                    const res = await fetch(`http://3.36.52.35:8000/images/${id}`);
                    const imageData = await res.json();

                    // 이미지 데이터의 파손 정도 가져오기 
                    const detail = detailsArray.find(d=> d.image_id === id) || null;
                    
                    return {
                        ...imageData,
                        details: detail && detail.details ? detail.details : '정보 없음' // getDetails 엔드포인트에서 파손 정도 가져오기 
                    };
                });

                const markersData = await Promise.all(markerPromises);
                setMarkersData(markersData);
                console.log("markersData", markersData);
            } catch (error) {
                console.error('Error fetching markers:', error);
            }
        }

        fetchMarkers();
    }, []);


    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById('kakaomap_container');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 8
        };
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const locPosition = new kakao.maps.LatLng(lat, lon);
                map.setCenter(locPosition);
            });
        }

        // Filter markers based on selected damage parts
        const filteredMarkers = markersData.filter(markerData => {
            const damagePart = damageTypeMap[markerData.classification_result];
            console.log("markeer level ", markerData.details);
            const matchPart = selectedFilters.damageParts.length === 0 || selectedFilters.damageParts.includes(damagePart); // 필터 선택 안 됐을 때 (전체 데이터 다 띄우기) + 필터 선택 되었을 때
            const matchLevel = selectedFilters.damageLevels.length === 0 || selectedFilters.damageLevels.includes(markerData.details);
           
            return matchPart && matchLevel ; 
        });

        // Add markers to the map
        filteredMarkers.forEach(markerData => {

            const { gps, classification_result, filepath, details} = markerData;
            console.log("마커 데이터", markerData);
            if (gps && gps.length > 0) {
                const { latitude, longitude } = gps[0];
                const markerPosition = new kakao.maps.LatLng(latitude, longitude);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                });

                const content = `
                    <div class="infowindow-content">
                        <strong>파손 부분:</strong> ${damageTypeMap[classification_result] || '정보 없음'}<br />
                        <strong>파손 정도:</strong> ${ details || '정보 없음'}<br /> 
                        <img src="${filepath}" alt="파손 이미지"/>
                    </div>
                `;

                kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });

                setInfowindows(infowindows => [...infowindows, infowindow]);
            }
        });

        // 검색된 지역으로 지도의 중심 이동
        if (searchPlace) {
            geocoder.addressSearch(searchPlace, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const newCenter = new kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(newCenter);
                }
            });
        }

    }, [markersData, searchPlace, selectedFilters]);

    const resetMap = () => {
        infowindows.forEach(infowindow => infowindow.close());
         // 필터를 초기 상태로 되돌립니다

         
        setSelectedFilters({
            damageParts: [],
            damageLevels: [],
        });

    };

    useEffect(()=> {
        console.log("Updated selected Filters", selectedFilters);

    }, [selectedFilters]);


    return (
        <div id="kakaomap_container" className="kakaomap_container">
            <FilterBox onFilterChange={setSelectedFilters} />
            <img src={reset} alt="reset_button" className='reset_button' onClick={resetMap}/>
        </div>
    );
}

export { KakaoMap };
