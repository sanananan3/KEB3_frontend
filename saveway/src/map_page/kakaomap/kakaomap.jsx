import React, {useEffect} from 'react';
import './kakaomap.css';
import { FilterBox } from './filterbox';

const { kakao } = window;

function KakaoMap({ searchPlace }) {

    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        const container = document.getElementById('kakaomap_container');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places()

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              const lat = position.coords.latitude; // 위도
              const lon = position.coords.longitude; // 경도

              const locPosition = new kakao.maps.LatLng(lat, lon); // 현재 위치를 LatLng 객체로 변환

              // 지도의 중심을 현재 위치로 설정합니다.
              map.setCenter(locPosition);

              // 검색어에 대한 결과를 지도에 표시합니다.
              console.log("검색지역:", searchPlace);
              ps.keywordSearch(searchPlace, placesSearchCB);

          });
      } else {
          // Geolocation을 사용할 수 없는 경우 기본 위치를 사용하여 검색어 결과를 표시합니다.
          ps.keywordSearch(searchPlace, placesSearchCB);
      }

    
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            let bounds = new kakao.maps.LatLngBounds()
    
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i])
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
    
            map.setBounds(bounds)
          }
        }
    
        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          })
    
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
            infowindow.open(map, marker)
          })
        }

    }, [searchPlace]);
    
    return (
        <div id="kakaomap_container" className="kakaomap_container"> 
            <FilterBox />

        </div>
    );

}

export { KakaoMap };
