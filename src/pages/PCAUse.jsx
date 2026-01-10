import React, { useMemo, useState } from 'react';
import '../App.css';
import { useOutletContext } from 'react-router-dom';
import Plot from 'react-plotly.js';
import PCA from 'pca-js';
import ShowRaw from '../components/ShowRaw';

const PCAUse = () => {
  const { dataset, cleanedData, datasetName, loading, error } = useOutletContext();
  const [openRaw, toggleOpenRaw] = useState(false);
  const [colorColumn, setColorColumn] = useState('');

  const columns = useMemo(() => dataset && dataset.length > 0 ? Object.keys(dataset[0]) : [], [dataset]);

  const pcaCalculation = useMemo(() => {
    if (!cleanedData || cleanedData.length === 0) return null;
    
    const eigenVectors = PCA.getEigenVectors(cleanedData);
    const adjustedData = PCA.computeAdjustedData(cleanedData, eigenVectors[0], eigenVectors[1]);

    return adjustedData;
  }, [cleanedData]);


  return (
    <div className="graph-page-layout">
      <div className="graph">
        <Plot style={{ width: '100%', height: '100%' }} useResizeHandler={true}
          data={[
            {
              x: pcaCalculation?.adjustedData[0] || [],
              y: pcaCalculation?.adjustedData[1] || [],
              mode: 'markers',
              type: 'scatter',
              ...(colorColumn && {
                marker: {
                  color: dataset?.map(row => row[colorColumn]),
                },
              }),
            },
          ]}
          layout={{ title: 'PCA - Top 2 Components', xaxis: { title: 'PC1' }, yaxis: { title: 'PC2' } }}
        />
      </div>

      <div className="graph-helper">
        <div className="color-toggle">
          <label htmlFor="color-select">Color by column:</label>
          <select id="color-select" value={colorColumn} onChange={(e) => setColorColumn(e.target.value)}>
            <option value="">None</option>
            {columns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
        <ShowRaw open={openRaw} toggleOpen={toggleOpenRaw} dataset={dataset} />
      </div>
      
    </div>
  );
};

export default PCAUse;
