// // import React, { useState } from 'react';
// // import { Layout } from './../layout/layout';
// // import { Delete } from './delete';
// // import { Contents } from './contents';
// // import './dateview_page.css';
// // import './../styles/fonts.css';

// // const DateView = () => {
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 (4 * 2)

// //     const data = [
// //         { id: 1, date: '2024-08-13', userName: 'user_name1', photoCount: 3 },
// //         { id: 2, date: '2024-08-14', userName: 'user_name2', photoCount: 5 },
// //         { id: 3, date: '2024-08-15', userName: 'user_name3', photoCount: 7 },
// //         { id: 4, date: '2024-08-16', userName: 'user_name4', photoCount: 2 },
// //         { id: 5, date: '2024-08-17', userName: 'user_name5', photoCount: 8 },
// //         { id: 6, date: '2024-08-18', userName: 'user_name6', photoCount: 6 },
// //         { id: 7, date: '2024-08-19', userName: 'user_name7', photoCount: 4 },
// //         { id: 8, date: '2024-08-20', userName: 'user_name8', photoCount: 1 },
// //         { id: 9, date: '2024-08-21', userName: 'user_name9', photoCount: 5 },
// //         { id: 10, date: '2024-08-22', userName: 'user_name10', photoCount: 9 },
// //     ];

// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// //     const handleNextPage = () => {
// //         if (currentPage < Math.ceil(data.length / itemsPerPage)) {
// //             setCurrentPage(currentPage + 1);
// //         }
// //     };

// //     const handlePreviousPage = () => {
// //         if (currentPage > 1) {
// //             setCurrentPage(currentPage - 1);
// //         }
// //     };

// //     return (
// //         <Layout>
// //             <h1 className='title'>○ CONTENTS</h1>
// //             <h4 className='side_title'>Select Date to Manage Damaged Road Fixture Images</h4>
// //             <Delete />
// //             <div className='contents_grid'>
// //                 {currentItems.map((item, index) => (
// //                     <Contents
// //                         key={item.id}
// //                         date={item.date}
// //                         userName={item.userName}
// //                         photoCount={item.photoCount}
// //                         isEven={index % 2 === 0}
// //                     />
// //                 ))}
// //             </div>
// //             <div className="pagination">
// //                 <button onClick={handlePreviousPage} disabled={currentPage === 1}>
// //                     Previous
// //                 </button>
// //                 <span>Page {currentPage}</span>
// //                 <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}>
// //                     Next
// //                 </button>
// //             </div>
// //         </Layout>
// //     );
// // };

// // export default DateView;

// import React, { useState } from 'react';
// import { Layout } from './../layout/layout';
// import { Delete } from './delete';
// import { Contents } from './contents';
// import './dateview_page.css';
// import './../styles/fonts.css';
// import pageLeft from './../assets/page_left.png'; // 왼쪽 버튼 이미지
// import pageRight from './../assets/page_right.png'; // 오른쪽 버튼 이미지

// const DateView = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 (4 * 2)

//     const data = [
//         { id: 1, date: '2024-08-13', userName: 'user_name1', photoCount: 3 },
//         { id: 2, date: '2024-08-14', userName: 'user_name2', photoCount: 5 },
//         { id: 3, date: '2024-08-15', userName: 'user_name3', photoCount: 7 },
//         { id: 4, date: '2024-08-16', userName: 'user_name4', photoCount: 2 },
//         { id: 5, date: '2024-08-17', userName: 'user_name5', photoCount: 8 },
//         { id: 6, date: '2024-08-18', userName: 'user_name6', photoCount: 6 },
//         { id: 7, date: '2024-08-19', userName: 'user_name7', photoCount: 4 },
//         { id: 8, date: '2024-08-20', userName: 'user_name8', photoCount: 1 },
//         { id: 9, date: '2024-08-21', userName: 'user_name9', photoCount: 5 },
//         { id: 10, date: '2024-08-22', userName: 'user_name10', photoCount: 9 },
//     ];

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//     const handleNextPage = () => {
//         if (currentPage < Math.ceil(data.length / itemsPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <Layout>
//             <h1 className='title'>○ CONTENTS</h1>
//             <h4 className='side_title'>Select Date to Manage Damaged Road Fixture Images</h4>
//             <Delete />
//             <div className='contents_grid'>
//                 {currentItems.map((item, index) => (
//                     <Contents
//                         key={item.id}
//                         date={item.date}
//                         userName={item.userName}
//                         photoCount={item.photoCount}
//                         isEven={index % 2 === 0}
//                     />
//                 ))}
//             </div>
//             <div className="pagination">
//                 <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
//                     <img src={pageLeft} alt="Previous Page" />
//                 </button>
//                 <span>Page {currentPage}</span>
//                 <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(data.length / itemsPerPage)} className="pagination-btn">
//                     <img src={pageRight} alt="Next Page" />
//                 </button>
//             </div>
//         </Layout>
//     );
// };

// export default DateView;

import React, { useState } from 'react';
import { Layout } from './../layout/layout';
import { Delete } from './delete';
import { Contents } from './contents';
import './dateview_page.css';
import './../styles/fonts.css';
import pageLeft from './../assets/page_left.png'; // 왼쪽 버튼 이미지
import pageRight from './../assets/page_right.png'; // 오른쪽 버튼 이미지

const DateView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 (4 * 2)
    const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목을 관리하는 상태

    const data = [
        { id: 1, date: '2024-08-13', userName: 'user_name1', photoCount: 3 },
        { id: 2, date: '2024-08-14', userName: 'user_name2', photoCount: 5 },
        { id: 3, date: '2024-08-15', userName: 'user_name3', photoCount: 7 },
        { id: 4, date: '2024-08-16', userName: 'user_name4', photoCount: 2 },
        { id: 5, date: '2024-08-17', userName: 'user_name5', photoCount: 8 },
        { id: 6, date: '2024-08-18', userName: 'user_name6', photoCount: 6 },
        { id: 7, date: '2024-08-19', userName: 'user_name7', photoCount: 4 },
        { id: 8, date: '2024-08-20', userName: 'user_name8', photoCount: 1 },
        { id: 9, date: '2024-08-21', userName: 'user_name9', photoCount: 5 },
        { id: 10, date: '2024-08-22', userName: 'user_name10', photoCount: 9 },
    ];

    const [items, setItems] = useState(data);

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
                        photoCount={item.photoCount}
                        isEven={index % 2 === 0}
                        onSelect={handleSelectItem}
                        isSelected={selectedItems.includes(item.id)}
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
