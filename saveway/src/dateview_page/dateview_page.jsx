import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './../layout/layout';
import { Delete } from '../layout/delete';
import { Contents } from './contents';
import data from './../data/data'; 
import './dateview_page.css';
import './../styles/fonts.css';
import pageLeft from './../assets/page_left.png'; 
import pageRight from './../assets/page_right.png'; 

const DateView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 (4 * 2)
    const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목을 관리하는 상태

    const [items, setItems] = useState(data);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(items.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    

    const handleSelectItem = (id) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(item => item !== id)
                : [...prevSelectedItems, id]
        );
        
    };

    const handleNavigateToRefinePage = (id) => {
        navigate(`/refine_page/${id}`);
    };

    const handleDelete = () => {
        setItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]); // 삭제 후 선택 상태 초기화
    };

    return (
        <Layout>
            <h1 className='title'>○ CONTENTS</h1>
            <h4 className='side_title'>Select Date to Manage Damaged Road Fixture Images</h4>
            <Delete onDelete={handleDelete} />
            <div className='contents_grid'>
                {currentItems.map((item, index) => (
                    <Contents
                        key={item.id}
                        id={item.id}
                        date={item.date}
                        userName={item.userName}
                        photoCount={item.photos.length}
                        isEven={index % 2 === 0}
                        onSelect={handleSelectItem}
                        isSelected={selectedItems.includes(item.id)}
                        onNavigate={handleNavigateToRefinePage}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                    <img src={pageLeft} alt="Previous Page" />
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(items.length / itemsPerPage)} className="pagination-btn">
                    <img src={pageRight} alt="Next Page" />
                </button>
            </div>
        </Layout>
    );
};

export default DateView;
