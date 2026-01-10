import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { cleanData } from '../components/CleanData';
import { useDataset } from '../graphQL/GQLQueries';
import { getActiveDatasetId } from '../db/indexedDB';

const PageLayout = () => {
    const [activeDatasetId, setActiveDatasetId] = useState(null);

    useEffect(() => {
        getActiveDatasetId().then(id => {
            if (id) setActiveDatasetId(id);
        });
    }, []);

    const { dataset, datasetName, loading, error, updateDatasetName } = useDataset(activeDatasetId);
    const cleanedData = dataset ? cleanData(dataset) : null;

    return (
        <Box className="app" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header dataset={dataset} />
        <Box
            component="main"
            sx={{ 
                flexGrow: 1, 
                overflow: 'auto'
            }}
        >
        <Outlet context={{ activeDatasetId, setActiveDatasetId, dataset, cleanedData, datasetName, loading, error, updateDatasetName }} />
        </Box>
        <Footer />
    </Box>
  );
}

export default PageLayout;