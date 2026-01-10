import '../App.css';
import { useState } from 'react';
import { umapMath, umapUsedFor, umapExample, umapHowToInterpret, umapAboveShowMath, umapAboveShowGeneral } from '../components/Explanations.jsx';
// Note: UMAP explanations are placeholders, need to be filled in Explanations.jsx

const UMAPExplanation = () => {
    const [showMath, toggleShowMath] = useState(false);

    return (
        <div className="explanation-page-layout">
            {!showMath ? 
                <>
                    <div className="explanation-page-left">
                        <div className="explanation-top-container">
                            <div className="explanation-top-box">
                                <div className="explanation-title">
                                    Used For Title
                                </div>
                                <div className="explanation-description">
                                    UMAP is used for dimensionality reduction and visualization, similar to t-SNE but often faster and better at preserving global structure.
                                </div>
                            </div>
                            <div className="explanation-top-box">
                                <div className="explanation-title">
                                    How to Interpret Title
                                </div>
                                <div className="explanation-description">
                                    LOREM IPSUM FOR how to interpret UMAP plots.
                                </div>
                            </div>
                        </div>
                        <div className="explanation-example">
                            {/* Placeholder for UMAP example */}
                            <p>UMAP Example content goes here. UMAP (Uniform Manifold Approximation and Projection) is a technique for dimensionality reduction that can be used for visualization of high-dimensional data.</p>
                        </div>
                    </div>
                    <div className="explanation-page-right">
                        <div className="explanation-above-btn">
                            The explanations on this page are meant to illustrate the goals of UMAP, and the general methods used to achieve them. Click below to learn how the math behind it works.
                        </div>
                        <button className="btn btn-teal" onClick={() => toggleShowMath(true)}>Show<br/>Math</button>
                    </div>
                </>
            :
                <>
                    <div className="explanation-page-left">
                        <div className="explanation-top-container-math">
                            <div className="explanation-top-box">
                                <div className="explanation-title">
                                    Math Behind UMAP
                                </div>
                                <div className="explanation-description">
                                    Detailed mathematical explanation of UMAP.
                                </div>
                            </div>
                        </div>
                        <div className="explanation-example">
                            {/* Placeholder for UMAP math */}
                            <p>UMAP Math content goes here. The mathematics involve graph theory, topological data analysis, and optimization techniques.</p>
                        </div>
                    </div>
                    <div className="explanation-page-right">
                        <div className="explanation-above-btn">
                            This page shows how the math for UMAP works, and should help illuminate why it works the way it does.
                        </div>
                        <button className="btn btn-teal" onClick={() => toggleShowMath(false)}>Show<br/>General</button>
                    </div>
                </>
            }
        </div>
    )
}

export default UMAPExplanation;