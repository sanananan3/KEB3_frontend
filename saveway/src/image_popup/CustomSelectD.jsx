import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelectD = () => {

    const option = [
        {value:"상", label:"상"},
        {value:"중", label:"중"},
        {value:"하", label:"하"},

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
            placeholder="파손 정도를 선택하세요"
            defaultValue={selectOption} 
            styles={customStyles}
        />
    );
};

export default CustomSelectD;
