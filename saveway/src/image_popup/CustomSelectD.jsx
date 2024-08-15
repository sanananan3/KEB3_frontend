import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelectD = ({ onChange, placeholder }) => {
    const options = [
        { value: "상", label: "상" },
        { value: "중", label: "중" },
        { value: "하", label: "하" }
    ];

    const [selectOption, setSelectOption] = useState(null);

    const handleChange = (option) => {
        setSelectOption(option);
        if (onChange) {
            onChange(option);
        }
    };

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
            backgroundColor: state.isSelected ? "#f0f0f0" : "#ffffff",
            color: state.isSelected ? "#000000" : "#7C6B6B",
            "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#000000",
            },
        }),
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder={placeholder}
            value={selectOption}
            styles={customStyles}
        />
    );
};

export default CustomSelectD;
