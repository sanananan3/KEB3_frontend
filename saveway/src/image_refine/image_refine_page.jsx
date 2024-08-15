import React, { useState } from 'react';
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
    const { imageOrigin } = location.state;
    const { id } = useParams();
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;  // Display 12 images per page (6*2 grid)
    const [selectPopup, setSelectPopup] = useState(false);


    const item = data.find(item => item.id === parseInt(id));

    const handleNextPage = () => {
        if (currentPage < Math.ceil(imageOrigin.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };


    const handlePopup = () => {
        // 여기까지는 들어감 
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

    const handleDelete = () => {
        const remainingPhotos = imageOrigin.filter((_, index) => !selectedPhotos.includes(index));
        setSelectedPhotos([]);
    };

    // Calculate the range of photos to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedPhotosToDisplay = item?.photos.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout>
            <Delete onDelete={handleDelete} />
            <h1 className='title'>○ IMAGE REFINEMENT</h1>
            <h4 className='side_title'>Refine Images for {imageOrigin[0].date}</h4>
            <div className='image_grid'>
                {imageOrigin.map((image, index) => (
                    <div key={startIndex + index} className='image_item'>
                        <img src={image.url} alt={`Image ${index}`} onClick={handlePopup} />
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

            {selectPopup && <PopupInside onClose={() => setSelectPopup(false)} />} 

        </Layout>
    );
};

export default RefinePage;
