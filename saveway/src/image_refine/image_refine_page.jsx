import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from './../data/data';
import { Layout } from './../layout/layout';
import { Delete } from './../layout/delete';
import './image_refine_page.css';
import pageLeft from './../assets/page_left.png'; 
import pageRight from './../assets/page_right.png'; 

const RefinePage = () => {
    const { id } = useParams();
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;  // Display 12 images per page (6*2 grid)

    const item = data.find(item => item.id === parseInt(id));

    const handleNextPage = () => {
        if (currentPage < Math.ceil(item.photos.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
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
        if (item) {
            item.photos = item.photos.filter((_, index) => !selectedPhotos.includes(index));
            setSelectedPhotos([]);
        }
    };

    // Calculate the range of photos to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedPhotosToDisplay = item?.photos.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout>
            <Delete onDelete={handleDelete} />
            <h1 className='title'>○ IMAGE REFINEMENT</h1>
            <h4 className='side_title'>Refine Images for {item?.date}</h4>
            <div className='image_grid'>
                {selectedPhotosToDisplay?.map((photo, index) => (
                    <div key={startIndex + index} className='image_item'>
                        <img src={photo.path} alt={photo.type} />
                        <input 
                            type="checkbox" 
                            checked={selectedPhotos.includes(startIndex + index)} 
                            onChange={() => handleSelectPhoto(startIndex + index)} 
                            className="photo-checkbox"
                        />
                        <p>{photo.type}</p>
                        <p>{photo.gpsLocation}</p>
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
                    disabled={currentPage >= Math.ceil(item.photos.length / itemsPerPage)} 
                    className="pagination-btn"
                >
                    <img src={pageRight} alt="Next Page" />
                </button>
            </div>
        </Layout>
    );
};

export default RefinePage;
