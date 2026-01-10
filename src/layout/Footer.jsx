import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer-right-container">
            <div className="btn btn-white" onClick={() => navigate('/pca/explanation')}>PCA<br/>Explanation</div>
            <div className="btn btn-white" onClick={() => navigate('/umap/explanation')}>UMAP<br/>Explanation</div>
        </div>
    );
}

export default Footer;