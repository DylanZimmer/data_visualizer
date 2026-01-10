import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Plot from 'react-plotly.js';

const rawData = [
  { body: 5, width: 8, length: 10, snout: 6 },
  { body: 6, width: 8.5, length: 11, snout: 6.2 },
  { body: 5.5, width: 9, length: 11, snout: 5.5 },
  { body: 7, width: 9, length: 12, snout: 5 },
  { body: 4.5, width: 7.5, length: 9, snout: 6.5 },
];

const meanCenteredData = rawData.map(row => ({
  body: (row.body - 5.6).toFixed(2),
  width: (row.width - 8.4).toFixed(2),
  length: (row.length - 10.6).toFixed(2),
  snout: (row.snout - 5.84).toFixed(2),
}));

export const pcaMath = () => (
  <div>
    <p>To start with you have a dataset with columns containing continuous data. To stick with our example, this could be measurements of newborn puppies. Say our raw data is:</p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Body Mass (kg)</TableCell>
            <TableCell>Skull Width (cm)</TableCell>
            <TableCell>Skull Length (cm)</TableCell>
            <TableCell>Snout Length (cm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rawData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.body}</TableCell>
              <TableCell>{row.width}</TableCell>
              <TableCell>{row.length}</TableCell>
              <TableCell>{row.snout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p>First, this data needs to be normalized, so that each measurement sits on the same scale. Skull length happens to generally be larger than snout length, but we don't want to let the skull length have a larger impact on the data because of this. So we mean-center the raw data by finding the mean of each column and subtracting it from each value. The mean of the given body masses is 5.6, so we subtract 5.6 from each body mass value. Our mean-centered dataset is:</p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Body Mass (kg)</TableCell>
            <TableCell>Skull Width (cm)</TableCell>
            <TableCell>Skull Length (cm)</TableCell>
            <TableCell>Snout Length (cm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meanCenteredData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.body}</TableCell>
              <TableCell>{row.width}</TableCell>
              <TableCell>{row.length}</TableCell>
              <TableCell>{row.snout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p>Once we have mean-centered data we can compute the covariance matrix, which will tell us how strongly each data type affects each other. The general formula for the covariance between two data types X and Y is cov(X,Y) = (1/(n-1)) * sum((Xi - Xmean) * (Yi - Ymean)). The covariance matrix for our example is:</p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Body Mass</TableCell>
            <TableCell>Skull Width</TableCell>
            <TableCell>Skull Length</TableCell>
            <TableCell>Snout Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Body Mass</TableCell>
            <TableCell>0.48</TableCell>
            <TableCell>0.35</TableCell>
            <TableCell>0.56</TableCell>
            <TableCell>-0.12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skull Width</TableCell>
            <TableCell>0.35</TableCell>
            <TableCell>0.42</TableCell>
            <TableCell>0.41</TableCell>
            <TableCell>0.02</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skull Length</TableCell>
            <TableCell>0.56</TableCell>
            <TableCell>0.41</TableCell>
            <TableCell>0.64</TableCell>
            <TableCell>-0.18</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Snout Length</TableCell>
            <TableCell>-0.12</TableCell>
            <TableCell>0.02</TableCell>
            <TableCell>-0.18</TableCell>
            <TableCell>0.26</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <p>Once we have the covariance matrix, we can compute its eigenvectors. These are the vectors that best describe the whole covariance matrix, because they show where the data varies the most heavily. The eigenvector with the largest corresponding eigenvalue is the vector that maximizes this variation the most. It captures the most dominant pattern, so in our example it's natural that it would correspond to the overall size of the newborn puppies. The eigenvector with the highest eigenvalue (3.45) is [0.57, 0.38, 0.57, -0.25], and the second highest (0.21) is [-0.1, 0.5, -0.1, 0.85].</p>
    <p>We can now compute the PCA graph by taking all information for each pup and multiplying it by the values in the corresponding principal component. Here is a sample PCA plot:</p>
    <Plot
      data={[
        {
          x: [1.2, -0.8, 0.5, -1.5, 0.6],
          y: [0.3, 1.0, -0.7, 0.2, -0.8],
          mode: 'markers',
          type: 'scatter',
          name: 'Puppies',
        },
      ]}
      layout={{ title: 'Sample PCA Plot', xaxis: { title: 'PC1' }, yaxis: { title: 'PC2' } }}
    />
  </div>
);

export const pcaUsedFor = // This at top left
`\
Principal Component Analysis is used to visualize high dimensional data in 2D or 3D by capturing the directions of greatest variance, revealing how data points differ and which groups naturally cluster together.\
`;

export const pcaExample = () => (
  <div>
    <p>Say a veterinary lab wants to know whether or not a newborn puppy of a specific type is likely to develop problems. Assume they have data from previous newborns that looks at their body mass, skull width, skull length, and snout length. They can upload this dataset, then examine its PCA graph and corresponding vector of each axis.</p>
    <p>Say the x axis has a corresponding vector of <strong>[0.57, 0.38, 0.57, -0.25]</strong>. That means that a puppy on the PCA graph with a large x value will have a large body mass, skull width, and skull length, likely with a smaller snout length. The columns with positive values in this corresponding vector will grow together as the columns with negative values shrink.</p>
    <p>Now assume that the vector corresponding to the y axis is <strong>[-0.1, 0.5, -0.1, 0.85]</strong>. That means that a puppy with a high y-value will likely have a large skull width and snout length, with its largest deciding factor being the snout length. It will correspond to a smaller body mass and skull length, but much less strongly than it corresponds to the positive values, because they're much higher.</p>
    <p>This PCA graph can be used to establish what the normal correspondences between these features are, and to allow this lab to graph future newborn puppies and determine if they fall outside of that range, and are therefore at a higher risk of developing problems.</p>
    <p>Note that the eigenvalues indicate the importance: the first principal component explains about 86% of the variance, and the second about 5%.</p>
  </div>
);

export const pcaHowToInterpret = 
`\
In a PCA graph, each axis is a principal component representing a direction of maximum variance in the data. \
Points that are far apart differ strongly along those dominant patterns, while clusters indicate similar feature profiles.\
`;

export const pcaAboveShowMath =
`\
The explanations on this page are meant to illustrate the goals of Principal Component Analysis, and the general methods used \
to achieve them. Click below to learn how the math behind it works.\
`;

export const pcaAboveShowGeneral =
`\
This page shows how the math for Principal Component Analysis works, and should help illuminate why it works the way it does and how to \
interpret any potential nuances.\
`;

export const umapMath = () => (
  <div>
    <p>To start, we have a dataset of newborn puppies with measurements such as body mass, skull width, skull length, and snout length. Each row represents one puppy.</p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Body Mass (kg)</TableCell>
            <TableCell>Skull Width (cm)</TableCell>
            <TableCell>Skull Length (cm)</TableCell>
            <TableCell>Snout Length (cm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rawData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.body}</TableCell>
              <TableCell>{row.width}</TableCell>
              <TableCell>{row.length}</TableCell>
              <TableCell>{row.snout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p>First, we normalize the data so that each measurement has the same scale. This prevents features with larger numerical ranges from dominating the analysis. For example, if body mass ranges from 4–7 kg and snout length from 2–4 cm, we scale them so all features roughly range from 0 to 1.</p>
    <p>Next, UMAP computes the pairwise distances between all puppies to determine their local neighborhoods. Suppose puppy A has measurements [5.0, 10.2, 12.5, 4.0] and puppy B has [5.1, 10.3, 12.4, 4.1]. The distance between them is small, so UMAP treats them as neighbors. Puppy C with measurements [6.8, 13.0, 14.5, 5.2] is farther away and considered less similar.</p>
    <p>UMAP then constructs a weighted graph where puppies are nodes and edges connect nearest neighbors, with edge weights reflecting similarity. For instance, puppy A might be connected to puppies B and D with weights 0.95 and 0.88, indicating very strong similarity, while puppy C might have edges with weights around 0.3 to the same puppies.</p>
    <p>Finally, UMAP optimizes a low-dimensional embedding to preserve these neighborhood relationships. It places puppies close together in 2D if they are strongly connected in the graph, and farther apart if they are weakly connected. Example coordinates in 2D might be:</p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Puppy</TableCell>
            <TableCell>X</TableCell>
            <TableCell>Y</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>1.2</TableCell>
            <TableCell>0.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>B</TableCell>
            <TableCell>1.3</TableCell>
            <TableCell>1.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>C</TableCell>
            <TableCell>4.8</TableCell>
            <TableCell>-2.1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>D</TableCell>
            <TableCell>-0.5</TableCell>
            <TableCell>2.3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <p>In the resulting UMAP plot, puppies that are close together have very similar measurements across all features, forming clusters of similar growth patterns. Puppies that are far apart differ significantly, highlighting potential outliers.</p>
    <p>The axes themselves do not have a direct physical meaning, and distances between faraway clusters are approximate. Interpretation focuses on local neighborhoods and cluster structure rather than exact coordinates.</p>
    <Plot
      data={[
        {
          x: [1.2, 1.3, 4.8, -0.5],
          y: [0.9, 1.0, -2.1, 2.3],
          mode: 'markers',
          type: 'scatter',
          name: 'Puppies',
        },
      ]}
      layout={{ title: 'Sample UMAP Plot', xaxis: { title: 'UMAP1' }, yaxis: { title: 'UMAP2' } }}
    />
  </div>
);


export const umapUsedFor = 
`\
Uniform Manifold Approximation and Projection is used to visualize the structure of high dimensional data in 2D or 3D, revealing relationships between data points and how groups cluster together.\
`;


export const umapExample = () => (
  <div>
    <p>Say a veterinary lab collects measurements for newborn puppies, including body mass, skull width, skull length, and snout length. After uploading the dataset, the lab examines a UMAP graph where each point represents a single puppy.</p>
    <p>Suppose one puppy appears at coordinates <strong>(1.2, 0.9)</strong> and another at <strong>(1.3, 1.0)</strong>. Because these points are very close together, those puppies have highly similar measurements across all features.</p>
    <p>Another puppy might appear at <strong>(4.8, -2.1)</strong>, far from the first two. This indicates that its overall feature profile differs significantly, even though no single measurement alone explains the separation.</p>
    <p>If several puppies form a tight cluster around <strong>(-0.5, 2.3)</strong>, that cluster represents a group with similar growth patterns or proportions. Isolated points or small clusters can indicate unusual development and may warrant closer attention.</p>
    <p>The numeric axis values themselves do not correspond to specific physical measurements, and distances between faraway clusters are approximate. Interpretation should focus on relative proximity and cluster structure rather than exact coordinates.</p>
  </div>
);


export const umapHowToInterpret = 
`\
In a UMAP graph, points that are close together represent data that is similar in the original high dimensional space, while points far apart are less similar. \
Clusters indicate groups with shared characteristics, but exact distances and axis values are not directly meaningful.\
`;

export const umapAboveShowMath =
`\
The explanations on this page are meant to illustrate the goals of Uniform Manifold Approximation and Projection, and the general methods used \
to achieve them. Click below to learn how the math behind it works.\
`;

export const umapAboveShowGeneral =
`\
This page shows how the math for Uniform Manifold Approximation and Projection works, and should help illuminate why it works the way it does and how to \
interpret any potential nuances.\
`;