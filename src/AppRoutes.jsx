import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import Homepage from './pages/Homepage';
import PCAUse from './pages/PCAUse';
import PCAExplanation from './pages/PCAExplanation';
import UMAPUse from './pages/UMAPUse';
import UMAPExplanation from './pages/UMAPExplanation';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/pca/use" element={<PCAUse />} />
                <Route path="/pca/explanation" element={<PCAExplanation />} />
                <Route path="/umap/use" element={<UMAPUse />} />
                <Route path="/umap/explanation" element={<UMAPExplanation />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;