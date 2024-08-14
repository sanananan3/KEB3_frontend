import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import './mainpage.css';

import { useNavigate } from "react-router-dom";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <div className="bg-white  rounded-lg px-8 py-12">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};



export const Overlay = () => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  const navigate = useNavigate();

  const goToMapPage = () => {
    navigate('/map_page');

  }

  const goToDateviewPage = () => {

    navigate('/dateview_page');
  }

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection (scroll.range(2 / 3, 1) < 1 ? scroll.range(2 / 3, 1) : 1);
  });

  return (
    <Scroll html>




        <Section opacity={opacityFirstSection}>
          <div className="introContent">
          <p>
            반갑습니다, sananan님
          </p>
          </div>
  
        </Section>

        <Section right opacity={opacitySecondSection}>

          <div className="secondContent">
            <p>
              파손을 검토하고,
          <br>
          </br>
              현재 현황을 확인하세요
            </p>
          </div>

        </Section>

        <Section  opacity={opacityLastSection}>
          
          <div className="thirdWrap">

            <div className="image-direct">
              <img src = "/arrow_left.png" alt = "image_arrow" onClick={goToDateviewPage}/>
            </div>

            <div className="map-direct">
            <img src = "/arrow_right.png" alt = "map_arrow"  onClick={goToMapPage}/>

            </div>

          </div>

        </Section>


    </Scroll>
  );
};
