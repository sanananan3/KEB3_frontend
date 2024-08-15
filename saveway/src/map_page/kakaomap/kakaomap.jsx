// import React, {useEffect, useState} from 'react';
// import './kakaomap.css';
// import { FilterBox } from './filterbox';

// const { kakao } = window;

// function KakaoMap({ searchPlace }) {
//     const [markersData, setMarkersData] = useState([]);

//     useEffect(() => {
//         var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
//         const container = document.getElementById('kakaomap_container');
//         const options = {
//             center: new kakao.maps.LatLng(33.450701, 126.570667),
//             level: 3
//         };
//         const map = new kakao.maps.Map(container, options);
//         const ps = new kakao.maps.services.Places()


//         if (navigator.geolocation) {

    
//           navigator.geolocation.getCurrentPosition(function(position) {

//               const lat = position.coords.latitude; // 위도
//               const lon = position.coords.longitude; // 경도


//               const locPosition = new kakao.maps.LatLng(lat, lon); // 현재 위치를 LatLng 객체로 변환

//               // 지도의 중심을 현재 위치로 설정합니다.
//               map.setCenter(locPosition);

//               // 검색어에 대한 결과를 지도에 표시합니다.

//               ps.keywordSearch(searchPlace, placesSearchCB);

//           });
//       } else {
//           // Geolocation을 사용할 수 없는 경우 기본 위치를 사용하여 검색어 결과를 표시합니다.
//           ps.keywordSearch(searchPlace, placesSearchCB);
//       }

    
//         function placesSearchCB(data, status, pagination) {
//           if (status === kakao.maps.services.Status.OK) {
//             let bounds = new kakao.maps.LatLngBounds()
    
//             for (let i = 0; i < data.length; i++) {
//               displayMarker(data[i])
//               bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
//             }
    
//             map.setBounds(bounds)
//           }
//         }
    
//         function displayMarker(place) {
//           let marker = new kakao.maps.Marker({
//             map: map,
//             position: new kakao.maps.LatLng(place.y, place.x),
//           })
    
//           // 마커에 클릭이벤트를 등록합니다
//           kakao.maps.event.addListener(marker, 'click', function () {
//             // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//             infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
//             infowindow.open(map, marker)
//           })
//         }

//     }, [searchPlace]);
    
//     return (
//         <div id="kakaomap_container" className="kakaomap_container"> 
//             <FilterBox />

//         </div>
//     );

// }

// export { KakaoMap };
import React, { useEffect, useState } from 'react';
import './kakaomap.css';
import { FilterBox } from './filterbox';

const { kakao } = window;

function KakaoMap({ searchPlace }) {
    const [markersData, setMarkersData] = useState([]);

    // 데이터베이스에서 마커 데이터를 가져오는 함수
    useEffect(() => {
        async function fetchMarkers() {
            const response = await fetch('http://3.39.6.45:8000/images');  // API 엔드포인트에 맞게 변경
            const data = await response.json();

            // data가 배열인지 확인하고, 배열이 아니라면 배열로 변환
            if (Array.isArray(data)) {
                setMarkersData(data);
            } else {
                setMarkersData([data]);
            }
        }

        fetchMarkers();
    }, []);

    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById('kakaomap_container');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude; // 위도
                const lon = position.coords.longitude; // 경도

                const locPosition = new kakao.maps.LatLng(lat, lon); // 현재 위치를 LatLng 객체로 변환
                map.setCenter(locPosition);

                // 검색어에 대한 결과를 지도에 표시합니다.
                ps.keywordSearch(searchPlace, placesSearchCB);
            });
        } else {
            // Geolocation을 사용할 수 없는 경우 기본 위치를 사용하여 검색어 결과를 표시합니다.
            ps.keywordSearch(searchPlace, placesSearchCB);
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
            }
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }

        // 데이터베이스에서 가져온 GPS 데이터를 바탕으로 마커를 지도에 추가하는 함수
        markersData.forEach(markerData => {
            const { gps, classification_result, filepath } = markerData;
            if (gps && gps.length > 0) {
                const { latitude, longitude } = gps[0];
                const markerPosition = new kakao.maps.LatLng(latitude, longitude);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                });

                const content = `
                    <div style="padding:5px;font-size:12px;">
                        <strong>파손 부분:</strong> ${classification_result || '정보 없음'}<br />
                        <img src="${filepath}" alt="파손 이미지" style="width:100px;height:auto;"/>
                    </div>
                `;

                kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
        });

    }, [searchPlace, markersData]);

    return (
        <div id="kakaomap_container" className="kakaomap_container">
            <FilterBox />
        </div>
    );
}

export { KakaoMap };
