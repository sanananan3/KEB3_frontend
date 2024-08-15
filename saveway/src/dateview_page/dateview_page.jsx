import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './../layout/layout';
import { Delete } from '../layout/delete';
import { Contents } from './contents';
import './dateview_page.css';
import './../styles/fonts.css';
import pageLeft from './../assets/page_left.png'; 
import pageRight from './../assets/page_right.png'; 

const DateView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 (4 * 2)
    const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목을 관리하는 상태
    const [groupedItems, setGroupedItems] = useState([]); // 날짜별로 그룹화된 아이템을 저장
    const navigate = useNavigate();

    useEffect(() => {
        // 데이터를 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.39.6.45:8000/images/total');
                const data = await response.json();
                const grouped = groupByDate(data.total_images);
                setGroupedItems(grouped);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const groupByDate = (images) => {
        const grouped = images.reduce((acc, image) => {
            const date = new Date(image.uploaded_at).toLocaleDateString(); // 날짜 형식으로 그룹화
            if (!acc[date]) {
                acc[date] = { date, photoCount: 1, items: [image] };
            } else {
                acc[date].photoCount += 1;
                acc[date].items.push(image);
            }
            return acc;
        }, {});

        return Object.values(grouped); // 객체를 배열로 변환
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groupedItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(groupedItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSelectItem = (date) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(date)
                ? prevSelectedItems.filter(item => item !== date)
                : [...prevSelectedItems, date]
        );
    };

    const handleNavigateToRefinePage = (id) => {
        navigate(`/refine_page/${id}`);
    };


    const handleDelete = async () => {
        try {
            // Iterate over selected items and make a DELETE request for each
            for (const date of selectedItems) {
                const itemsToDelete = groupedItems.find(item => item.date === date)?.items;

                if (itemsToDelete) {
                    for (const image of itemsToDelete) {
                        const response = await fetch(`http://3.39.6.45:8000/images/${image.id}`, {
                            method: 'DELETE',
                        });

                        if (!response.ok) {
                            console.error(`Failed to delete image with id ${image.id}`);
                            // Handle the error as needed, e.g., show a notification
                        }
                    }
                }
            }

            // After successful deletion, update the state to remove deleted items
            const remainingItems = groupedItems.filter(item => !selectedItems.includes(item.date));
            setGroupedItems(remainingItems);
            setSelectedItems([]); // Clear the selection after deletion
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    return (
        <Layout>
            <h1 className='title'>○ CONTENTS</h1>
            <h4 className='side_title'>Select Date to Manage Damaged Road Fixture Images</h4>
            <Delete onDelete={handleDelete} />
            <div className='contents_grid'>
                {currentItems.map((item, index) => (
                    <Contents
                        key={item.date}
                        id={item.date}
                        date={item.date}
                        userName="User" // userName을 개별 이미지에서 가져오려면 item.items[0].filename.split('_')[0] 등을 사용 가능 //이미지수집방법으로 변경예정
                        photoCount={item.photoCount}
                        isEven={index % 2 === 0}
                        onSelect={handleSelectItem}
                        isSelected={selectedItems.includes(item.date)}
                        onNavigate={() => handleNavigateToRefinePage(item.items[0].id)}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                    <img src={pageLeft} alt="Previous Page" />
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(groupedItems.length / itemsPerPage)} className="pagination-btn">
                    <img src={pageRight} alt="Next Page" />
                </button>
            </div>
        </Layout>
    );
};

export default DateView;

