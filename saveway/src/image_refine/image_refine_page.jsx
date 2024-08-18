import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from './../data/data';
import { Layout } from './../layout/layout';
import { Delete } from './../layout/delete';
import './image_refine_page.css';
import pageLeft from './../assets/page_left.png'; 
import pageRight from './../assets/page_right.png'; 
import { PopupInside } from '../image_popup/PopupInside';
import { useLocation } from 'react-router-dom';

const RefinePage = () => {

    const location = useLocation();
    const { imageOrigin: initialImageOrigin } = location.state;
    const { id } = useParams();
    const [imageOrigin, setImageOrigin] = useState(initialImageOrigin); // imageOrigin을 상태로 관리
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;  // Display 12 images per page (6*2 grid)
    const [selectPopup, setSelectPopup] = useState(false);
    const [selectImageIndex, setSelectImageIndex] = useState(null);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(imageOrigin.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePopup = (index) => {
        setSelectImageIndex(index);

        setSelectPopup(true);
        console.log("Popup state:", selectPopup);
    };   

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSelectPhoto = (photoIndex) => {
        setSelectedPhotos(prevSelectedPhotos =>
            prevSelectedPhotos.includes(photoIndex)
                ? prevSelectedPhotos.filter(index => index !== photoIndex)
                : [...prevSelectedPhotos, photoIndex]
        );
    };

    const handleDelete = async () => {
        try {
            // 선택된 사진들을 반복하면서 각각의 사진에 대해 DELETE 요청을 보냅니다.
            for (const photoIndex of selectedPhotos) {
                const image = imageOrigin[photoIndex];
    
                const response = await fetch(`http://13.124.159.202:8000/images/${image.id}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    console.error(`id가 ${image.id}인 이미지를 삭제하는 데 실패했습니다.`);
                }
            }
    
            const remainingPhotos = imageOrigin.filter((_, index) => !selectedPhotos.includes(index));
            setImageOrigin(remainingPhotos); 
            setSelectedPhotos([]); 
        } catch (error) {
            console.error('이미지를 삭제하는 동안 오류가 발생했습니다:', error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedPhotosToDisplay = imageOrigin.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout>
            <Delete onDelete={handleDelete} />
            <h1 className='title'>○ IMAGE REFINEMENT</h1>
            <h4 className='side_title'>Refine Images for {imageOrigin[0]?.date}</h4>
            <div className='image_grid'>
                {selectedPhotosToDisplay.map((image, index) => (
                    <div key={startIndex + index} className='image_item'>
                        <img src={image.url} alt={`Image ${index}`} onClick={() => handlePopup(startIndex+index)} />

                        <input 
                            type="checkbox" 
                            checked={selectedPhotos.includes(startIndex + index)} 
                            onChange={() => handleSelectPhoto(startIndex + index)} 
                            className="photo-checkbox"
                        />
                        <p>{image.type}</p>
                        <p>{image.gpsLocation}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1} 
                    className="pagination-btn"
                >
                    <img src={pageLeft} alt="Previous Page" />
                </button>
                <span>Page {currentPage}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage >= Math.ceil(imageOrigin.length / itemsPerPage)} 
                    className="pagination-btn"
                >
                    <img src={pageRight} alt="Next Page" />
                </button>
            </div>

            {selectPopup && 
            (<PopupInside onClose={() => setSelectPopup(false)}

            image = {imageOrigin}
            totalImages={imageOrigin.length}
            currentIndex = {selectImageIndex} />)} 


        </Layout>
    );
};

export default RefinePage;

