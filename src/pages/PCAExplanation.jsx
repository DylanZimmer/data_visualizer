import '../App.css';
import { useState } from 'react';
import { pcaMath, pcaUsedFor, pcaExample, pcaHowToInterpret, pcaAboveShowMath, pcaAboveShowGeneral } from '../components/Explanations.jsx';

const PCAExplanation = () => {
    const [showMath, toggleShowMath] = useState(false);

    return (
        <div className="explanation-page-layout">
            {!showMath ? 
                <>
                    <div className="explanation-page-left">
                        <div className="explanation-top-container">
                            <div className="explanation-top-box">
                                <div className="explanation-title">
                                    What is PCA Used For?
                                </div>
                                <div className="explanation-description">
                                    { pcaUsedFor }
                                </div>
                            </div>
                            <div className="explanation-top-box">
                                <div className="explanation-title">
                                    How to Interpret PCA
                                </div>
                                <div className="explanation-description">
                                    { pcaHowToInterpret }
                                </div>
                            </div>
                        </div>
                        <div className="explanation-example"> {/* I should make the example take up like 70 or 80 % and include maybe the example graph or something */}
                            { pcaExample() }
                        </div>
                    </div>
                    <div className="explanation-page-right">
                        <div className="explanation-above-btn">
                            { pcaAboveShowMath }
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
                                    Math Behind PCA
                                </div>
                                <div className="explanation-description">
                                    Detailed mathematical explanation of PCA.
                                </div>
                            </div>
                        </div>
                        <div className="explanation-example">
                            { pcaMath() }
                        </div>
                    </div>
                    <div className="explanation-page-right">
                        <div className="explanation-above-btn">
                            { pcaAboveShowGeneral }
                        </div>
                        <button className="btn btn-teal" onClick={() => toggleShowMath(false)}>Show<br/>General</button>
                    </div>
                </>
            }
        </div>
    )
}

export default PCAExplanation;