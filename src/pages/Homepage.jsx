import React, { useState, useEffect } from 'react';
import '../App.css';
import DataFileUploader from '../components/DataFileUploader';
import TextAreaImporter from '../components/TextAreaImporter';
import ShowRaw from '../components/ShowRaw';
import { saveActiveDatasetId, deleteActiveDatasetId, saveDataset } from '../db/indexedDB';
import { useOutletContext } from 'react-router-dom';


const Homepage = () => {
    const [allowImport, setAllowImport] = useState(0); //0 for off, 1 for text import, 2 for file import
    const [openRaw, toggleOpenRaw] = useState(false);
    const [showExamples, toggleShowExamples] = useState(false);
    const { activeDatasetId: datasetId, setActiveDatasetId: setDatasetId, dataset, datasetName, updateDatasetName } = useOutletContext();

    const handleLoad = async rawData => {
        const id = Date.now().toString();
        await saveDataset(id, { name: 'New Dataset', rows: rawData });
        setDatasetId(id);
        await saveActiveDatasetId(id);
        setAllowImport(0);
    };

    const handleExampleLoad = async (exFile, exName) => {
        const response = await fetch(`/examples/${exFile}`);     
        const rawData = await response.json();
        const id = Date.now().toString();
        await saveDataset(id, { name: exName, rows: rawData });
        setDatasetId(id);
        await saveActiveDatasetId(id);
        toggleShowExamples(false);
    }

    /*
    const handleClear = async () => {
        setDatasetId(null);
        await deleteActiveDatasetId();
    };
    */

    return (
        <>
        <video autoPlay muted loop playsInline className="bg-video">
            <source src="/visuals/background.mp4" type="video/mp4" />
        </video>

        <div className="foreground">
            <div className="header-left-container">
                <img src="/visuals/visualizerLogo.png" alt="Visualizer logo"/>
                <div className="btn btn-white" onClick={() => toggleShowExamples(prev => !prev)}>Example<br/>Datasets</div>
                {showExamples &&
                    <div className="examples-container">
                        <div className="example-item" onClick={() => handleExampleLoad('titanic.json', 'Titanic Passengers')}>Titanic Passengers</div>
                        <div className="example-item" onClick={() => handleExampleLoad('whiteWine.json', 'White Wine Quality')}>White Wine Quality</div>
                        <div className="example-item" onClick={() => handleExampleLoad('iris.json', 'Iris Flowers')}>Iris Flowers</div>
                    </div>
                }
            </div>
            {!openRaw && (
                <>
                    {datasetId ?
                        <div className="box">
                            Current data set is : <input style={{ pointerEvents: 'auto' }} value={datasetName} onChange={(e) => updateDatasetName(e.target.value)}/>
                        </div>
                        :
                        <div className="box">No data set added. Import below or use example above.</div>
                    }
                    {allowImport === 0 &&
                        <button className="btn btn-white" onClick={() => setAllowImport(1)}>Import<br/>Data</button>
                    }
                    {allowImport === 1 &&
                        <TextAreaImporter onLoad={handleLoad} onSwitch={() => setAllowImport(2)} onClose={() => setAllowImport(0)}/>
                      //  <TextAreaImporter onLoad={async (data) => {setDatasetId(data); await saveActiveDatasetId(data); setAllowImport(0); }} onSwitch={() => setAllowImport(2)} onClose={() => setAllowImport(0)}/>
                    }
                    {allowImport === 2 &&
                        <DataFileUploader onLoad={handleLoad} onSwitch={() => setAllowImport(1)} onClose={() => setAllowImport(0)} />
                    }
                </>
            )}
            {dataset &&
                <ShowRaw open={openRaw} toggleOpen={toggleOpenRaw} dataset={dataset} />
            }
        </div>
        </>
    );
}

export default Homepage;
