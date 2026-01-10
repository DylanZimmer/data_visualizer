import React, { useMemo, useState } from 'react';
import '../App.css';
import { useOutletContext, Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { UMAP } from 'umap-js';
import ShowRaw from '../components/ShowRaw';

const UMAPUse = () => {
  const { dataset, cleanedData, datasetName, loading, error } = useOutletContext();
  const [openRaw, toggleOpenRaw] = useState(false);
  const [colorColumn, setColorColumn] = useState('');
  const [nComponents, setNComponents] = useState(2);
  const [nEpochs, setNEpochs] = useState(400);
  const [nNeighbors, setNNeighbors] = useState(15);

  const columns = useMemo(() => dataset && dataset.length > 0 ? Object.keys(dataset[0]) : [], [dataset]);

  const umapCalculation = useMemo(() => {
    if (!cleanedData || cleanedData.length === 0) return null;

    const umap = new UMAP({ nComponents, nEpochs, nNeighbors });
    const embedding = umap.fit(cleanedData);

    return embedding;
  }, [cleanedData, nComponents, nEpochs, nNeighbors])


  return (
    <div className="graph-page-layout">
      <div className="graph">
        <Plot style={{ width: '100%', height: '100%' }} useResizeHandler={true}
          data={[
            {
              x: umapCalculation?.map(p => p[0]) || [],
              y: umapCalculation?.map(p => p[1]) || [],
              ...(nComponents === 3 && { z: umapCalculation?.map(p => p[2]) || [] }),
              mode: 'markers',
              type: nComponents === 3 ? 'scatter3d' : 'scatter',
              text: umapCalculation?.map((p, i) => `Point ${i}`) || [],
              hovertemplate: nComponents === 3
                ? 'Point %{text}<br>UMAP1: %{x:.2f}<br>UMAP2: %{y:.2f}<br>UMAP3: %{z:.2f}<extra></extra>'
                : 'Point %{text}<br>UMAP1: %{x:.2f}<br>UMAP2: %{y:.2f}<extra></extra>',
              ...(colorColumn && {
                marker: {
                  color: dataset?.map(row => row[colorColumn]),
                },
              }),
            },
          ]}
          layout={{
            title: `UMAP - ${nComponents}D Embedding`,
            xaxis: { title: 'UMAP1' },
            yaxis: { title: 'UMAP2' },
            ...(nComponents === 3 && { zaxis: { title: 'UMAP3' } })
          }}
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
        <div className="umap-params">
          <h4>UMAP Parameters:</h4>
          <label>nComponents: <input type="number" min="2" max="3" value={nComponents} onChange={(e) => setNComponents(Number(e.target.value))} /></label>
          <label>nEpochs: <input type="number" min="1" value={nEpochs} onChange={(e) => setNEpochs(Number(e.target.value))} /></label>
          <label>nNeighbors: <input type="number" min="2" value={nNeighbors} onChange={(e) => setNNeighbors(Number(e.target.value))} /></label>
        </div>
        <div className="graph-explanation">
          <p><strong>What is this graph?</strong> This UMAP plot shows your high-dimensional data projected into 2 dimensions. Points that are close together in the original space are likely to be close in this visualization.</p>
          <p><strong>How to interpret:</strong> Clusters indicate groups of similar data points. Hover over points to see their indices. Use color coding to highlight categorical or numerical features.</p>
          <p><Link to="/umap/explanation">Learn more about UMAP</Link></p>
        </div>
        <ShowRaw open={openRaw} toggleOpen={toggleOpenRaw} dataset={dataset} />
      </div>
      
    </div>
  );
};

export default UMAPUse;
