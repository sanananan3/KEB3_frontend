
import React, { useState } from 'react';
import './filterbox.css';
import '../../styles/fonts.css';

const FilterBox = () => {
    const [isDamageLevelVisible, setDamageLevelVisible] = useState(false);
    const [isDamagePartVisible, setDamagePartVisible] = useState(false);
    const [selectedDamageLevels, setSelectedDamageLevels] = useState([]);
    const [selectedDamageParts, setSelectedDamageParts] = useState([]);

    const toggleDamageLevelVisibility = () => {
        setDamageLevelVisible(!isDamageLevelVisible);
    };

    const toggleDamagePartVisibility = () => {
        setDamagePartVisible(!isDamagePartVisible);
    };

    const handleDamageLevelChange = (event) => {
        const value = event.target.value;
        setSelectedDamageLevels(prevState =>
            prevState.includes(value)
                ? prevState.filter(item => item !== value)
                : [...prevState, value]
        );
    };

    const handleDamagePartChange = (event) => {
        const value = event.target.value;
        setSelectedDamageParts(prevState =>
            prevState.includes(value)
                ? prevState.filter(item => item !== value)
                : [...prevState, value]
        );
    };

    const handleSubmit = () => {
        // Handle submit logic here
        console.log('Selected Damage Levels:', selectedDamageLevels);
        console.log('Selected Damage Parts:', selectedDamageParts);
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
                        <label>
                            <input type="checkbox" name="damage-level" value="수리완료" onChange={handleDamageLevelChange} /> 수리완료
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
                        <label><input type="checkbox" name="damage-part" value="도로파손" onChange={handleDamagePartChange} /> 도로파손</label>
                        <label>
                            <input type="checkbox" name="damage-part" value="라바콘" onChange={handleDamagePartChange} /> 라바콘
                        </label>
                        <label>
                            <input type="checkbox" name="damage-part" value="시선유도봉" onChange={handleDamagePartChange} /> 시선유도봉
                        </label>
                        <label>
                            <input type="checkbox" name="damage-part" value="PE안내봉" onChange={handleDamagePartChange} /> PE안내봉
                        </label>
                        <label>
                            <input type="checkbox" name="damage-part" value="PE방호벽" onChange={handleDamagePartChange} /> PE방호벽
                        </label>
                        <label>
                            <input type="checkbox" name="damage-part" value="PE드럼" onChange={handleDamagePartChange} /> PE드럼
                        </label>
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
