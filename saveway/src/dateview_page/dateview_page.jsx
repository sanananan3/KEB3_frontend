import React from 'react';
import { Layout } from './../layout/layout';
import { Delete } from './delete';
import { Contents } from './contents';
import './dateview_page.css';
import './../styles/fonts.css';

const DateView = () => {

    return (
        <Layout>
            <h1 className='title'>○ CONTENTS</h1>
            <h4 className='side_title'>Select Date to Manage Damaged Road Fixture Images</h4>
            <Delete />
            <Contents />

        </Layout>
    );
};

export default DateView;
