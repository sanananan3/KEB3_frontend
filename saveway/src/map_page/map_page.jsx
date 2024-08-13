import React, { useState } from 'react';
import { Layout } from './../layout/layout';
import { Csv } from './csv_download';
import { SearchBar } from './kakaomap/searchbar';
import { KakaoMap } from './kakaomap/kakaomap';
import './map_page.css';

const MapPage = () => {
    const [place, setPlace] = useState('');

    return (
        <Layout>
            <SearchBar setPlace={setPlace} />
            <KakaoMap searchPlace={place} />
            <Csv />
        </Layout>
    );
};

export default MapPage;
