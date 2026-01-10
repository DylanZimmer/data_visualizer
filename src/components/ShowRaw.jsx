import React from 'react';
import '../App.css';

const ShowRaw = ({open, toggleOpen, dataset}) => {
    return (
        <>
        {open &&
            <div className="raw-json">
                <pre>{JSON.stringify(dataset, null, 2)}</pre>
            </div>
        }
        <button className="btn btn-white" onClick={() => toggleOpen(!open)}>{open ? 'Hide' : 'Show'}<br />Raw</button>
        </>

    )
}

export default ShowRaw;