import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';


const Header = ({ dataset }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <>
        {pathname !== '/' &&
            <div className="header-left-container">
                <img src="/visuals/visualizerLogo.png" alt="Visualizer logo" onClick={() => navigate('/')}/>
            </div>
        }
        {dataset === null ?
            <div className="header-right-container">
                <div className="btn btn-white btn-disabled">PCA<br/>View</div>
                <div className="btn btn-white btn-disabled">UMAP<br/>View</div>
            </div>
        :
            <div className="header-right-container">
                <div className="btn btn-white" onClick={() => navigate('/pca/use')} >PCA<br/>View</div>
                <div className="btn btn-white" onClick={() => navigate('/umap/use')}>UMAP<br/>View</div>
            </div>
        }
        </>
    );
}

export default Header;