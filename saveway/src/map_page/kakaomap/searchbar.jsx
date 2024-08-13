import React, { useState }  from 'react';
import './searchbar.css';
import leading_icon from '../../assets/Leading-icon.png'
import search_icon from '../../assets/search_icon.png'

const SearchBar = ({ setPlace }) => {
    const [inputText, setInputText] = useState('');

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(inputText);
        setInputText('');
    };
    
    return (

        <form className='search_bar' onSubmit={handleSubmit}>
                <div className='leading_icon'>
                    <img src={leading_icon} alt='leading_icon'/>
                </div>
                <div className='input_box'>
                    <input type='text' className='text_bar' placeholder="지역을 검색하세요." onChange={onChange} value={inputText} />
                </div>
                <button className='search_icon' type="submit">
                    <img src={search_icon} alt='search_icon'/>
                </button>
        </form>
    );

}

export { SearchBar };
