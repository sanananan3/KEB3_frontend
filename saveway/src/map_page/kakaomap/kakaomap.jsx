import React, { useEffect, useState } from 'react';
import reset from '../../assets/reset.png'; 
import './kakaomap.css';
import '../../styles/fonts.css';
import { FilterBox } from './filterbox';

const { kakao } = window;

const damageTypeMap = {
    "0": "PE방호벽",
    "1": "PE안내봉",
    "2": "PE드럼",
    "3": "포트홀",
    "4": "라바콘",
    "5": "시선유도봉"
};


function KakaoMap({ searchPlace }) {
    const [markersData, setMarkersData] = useState([]);
    const [infowindows, setInfowindows] = useState([]);
    const [selectedDamageParts, setSelectedDamageParts] = useState([]);

    // 데이터베이스에서 마커 데이터를 가져오는 함수
    useEffect(() => {
        async function fetchMarkers() {
            try {
                const response = await fetch('http://13.124.159.202:8000/images/total');
                const totalData = await response.json();
                const imageIds = totalData.total_images.map(image => image.id);

                const markerPromises = imageIds.map(async (id) => {
                    const res = await fetch(`http://13.124.159.202:8000/images/${id}`);
                    const imageData = await res.json();
                    return imageData;
                });

                const markersData = await Promise.all(markerPromises);
                setMarkersData(markersData);
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
            return selectedDamageParts.length === 0 || selectedDamageParts.includes(damagePart);
        });

        // Add markers to the map
        filteredMarkers.forEach(markerData => {
            const { gps, classification_result, filepath } = markerData;
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
                        <strong>파손 정도:</strong> ${'정보 없음'}<br /> 
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

    }, [markersData, searchPlace, selectedDamageParts]);

    const resetMap = () => {
        infowindows.forEach(infowindow => infowindow.close());
    };

    return (
        <div id="kakaomap_container" className="kakaomap_container">
            <FilterBox onFilterChange={setSelectedDamageParts} />
            <img src={reset} alt="reset_button" className='reset_button' onClick={resetMap}/>
        </div>
    );
}

export { KakaoMap };
