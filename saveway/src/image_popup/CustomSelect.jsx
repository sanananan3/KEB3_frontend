import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = () => {

    const option = [
        {value:"포트홀", label:"포트홀"},
        {value:"라바콘", label:"라바콘"},
        {value:"시선유도봉", label:"시선유도봉"},
        {value:"PE안내봉", label:"PE안내봉"},
        {value:"PE방호벽", label:"PE방호벽"},
        {value:"PE드럼", label:"PE드럼"}
    ]

    const [selectOption, setSelectOption] = useState(null);

    const customStyles = {
        placeholder: (provided) => ({
            ...provided,
            fontFamily: "EF_watermelonSalad",
            fontSize: "13px",
            color: "#A08080",
        }),

        control: (provided) => ({
            ...provided,
            fontFamily: "EF_watermelonSalad",
            fontSize: "15px",
        }),

        menu: (provided) => ({
            ...provided,
            fontFamily: "EF_watermelonSalad",

        }),

        option: (provided, state) => ({
            ...provided,
            fontFamily: "EF_watermelonSalad",
            fontSize: "15px",
            backgroundColor: state.isSelected? "#f0f0f0" : "#ffffff",
            color: state.isSelected ? "#000000" : "#7C6B6B",
            "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#000000",
            },
        }),
    };

    return (
        <Select 
            options={option}
            onChange={setSelectOption}
            placeholder="파손 종류를 선택하세요"
            defaultValue={selectOption} 
            styles={customStyles}
        />
    );
};

export default CustomSelect;
