import React, { useEffect,useState } from 'react';
import './filterbox.css';
import '../../styles/fonts.css';

const FilterBox = ({ onFilterChange }) => {
    const [isDamageLevelVisible, setDamageLevelVisible] = useState(false);
    const [isDamagePartVisible, setDamagePartVisible] = useState(false);
    const [tempSelectedDamageLevels, setTempSelectedDamageLevels] = useState([]);
    const [tempSelectedDamageParts, setTempSelectedDamageParts] = useState([]);

    const toggleDamageLevelVisibility = () => {
        setDamageLevelVisible(!isDamageLevelVisible);
    };

    const toggleDamagePartVisibility = () => {
        setDamagePartVisible(!isDamagePartVisible);
    };

    const handleDamageLevelChange = (event) => {
        const value = event.target.value;
        setTempSelectedDamageLevels(prevState =>
            prevState.includes(value)
                ? prevState.filter(item => item !== value)
                : [...prevState, value]
        );
    };

    const handleDamagePartChange = (event) => {
        const value = event.target.value;
        setTempSelectedDamageParts(prevState =>
            prevState.includes(value)
                ? prevState.filter(item => item !== value)
                : [...prevState, value]
        );
    };

    const handleSubmit = () => {

       

        onFilterChange({ damageParts: tempSelectedDamageParts, damageLevels: tempSelectedDamageLevels});
    
        setTempSelectedDamageLevels([]);
        setTempSelectedDamageParts([]);
        setDamageLevelVisible(false);
        setDamagePartVisible(false);

    };


    return (
        <>
            <div className="damage-level-box" onClick={toggleDamageLevelVisibility}>
                파손정도 ▼
            </div>
            {isDamageLevelVisible && (
                <div className="damage-level-list">
                    <div className="damage-level-filter-group">
                        <label>
                            <input type="checkbox" name="damage-level" value="상" onChange={handleDamageLevelChange} /> 상
                        </label>
                        <label>
                            <input type="checkbox" name="damage-level" value="중" onChange={handleDamageLevelChange} /> 중
                        </label>
                        <label>
                            <input type="checkbox" name="damage-level" value="하" onChange={handleDamageLevelChange} /> 하
                        </label>
                    </div>
                    <hr/>
                    <div className='button'>
                        <button onClick={handleSubmit}>확인</button>
                    </div>
                </div>
            )}

            <div className="damage-part-box" onClick={toggleDamagePartVisibility}>
                파손부분 ▼
            </div>

            {isDamagePartVisible && (
                <div className="damage-part-list">
                    <div className="damage-part-filter-group">
                        <label><input type="checkbox" name="damage-part" value="PE방호벽" onChange={handleDamagePartChange} /> PE방호벽</label>
                        <label><input type="checkbox" name="damage-part" value="PE안내봉" onChange={handleDamagePartChange} /> PE안내봉</label>
                        <label><input type="checkbox" name="damage-part" value="로드킬" onChange={handleDamagePartChange} /> 로드킬</label>
                        <label><input type="checkbox" name="damage-part" value="도로 요철 균열" onChange={handleDamagePartChange} /> 도로 요철 균열</label>
                        <label><input type="checkbox" name="damage-part" value="표지판 파손" onChange={handleDamagePartChange} /> 표지판 파손</label>
                        <label><input type="checkbox" name="damage-part" value="배수시설 불량" onChange={handleDamagePartChange} /> 배수시설 불량</label>
                        <label><input type="checkbox" name="damage-part" value="가드레일 파손" onChange={handleDamagePartChange} /> 가드레일 파손</label>
                        <label><input type="checkbox" name="damage-part" value="PE드럼" onChange={handleDamagePartChange} /> PE드럼 </label>
                        <br></br>
                        <label><input type="checkbox" name="damage-part" value="포트홀" onChange={handleDamagePartChange} /> 포트홀 </label>
                        <br></br>
                        <label><input type="checkbox" name="damage-part" value="라바콘" onChange={handleDamagePartChange} /> 라바콘</label>
                        <label><input type="checkbox" name="damage-part" value="시선유도봉" onChange={handleDamagePartChange} /> 시선유도봉</label>
                        <label><input type="checkbox" name="damage-part" value="낙석" onChange={handleDamagePartChange} /> 낙석 </label>
                        <br></br>
                        <label><input type="checkbox" name="damage-part" value="노면 균열" onChange={handleDamagePartChange} /> 노면 균열</label>
                        <label><input type="checkbox" name="damage-part" value="중앙 분리대" onChange={handleDamagePartChange} /> 중앙 분리대</label>
                        <label><input type="checkbox" name="damage-part" value="보도블럭 파손" onChange={handleDamagePartChange} /> 보도블럭 파손</label>

                    </div>
                    <hr/>
                    <div className='button'>
                        <button onClick={handleSubmit}>확인</button>
                    </div>
                </div>
            )}
        </>
    );
};

export { FilterBox };
