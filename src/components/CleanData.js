function isNumeric(value) {
  return !Array.isArray(value) && value !== '' && Number.isFinite(Number(value));
}

function dropNonNumeric(data) {
    if (!data.length) return data;
    
    const keys = Object.keys(data[0]);
    const dropKeys = new Set();
    
    for (const key of keys) {
        for (const row of data) {
            if (!isNumeric(row[key])) {
                dropKeys.add(key);
                break;
            }
        }
    }

    return data.map(row => {
        const cleaned = {};
        for (const [key, value] of Object.entries(row)) {
            if (!dropKeys.has(key)) {
                cleaned[key] = value;
            }
        }
        return cleaned;
    });
}

function to2DArray(data) {
  if (!data.length) return [];

  const keys = Object.keys(data[0]);

  return data.map(row =>
    keys.map(key => row[key])
  );
}

function columnMeans(matrix) {
  const nCols = matrix[0].length;
  const nRows = matrix.length;
  const means = Array(nCols).fill(0);

  for (let col = 0; col < nCols; col++) {
    let sum = 0;
    for (let row = 0; row < nRows; row++) {
      sum += matrix[row][col];
    }
    means[col] = sum / nRows;
  }

  return means;
}

function columnStd(matrix, means) {
  const nCols = matrix[0].length;
  const nRows = matrix.length;
  const stds = Array(nCols).fill(0);

  for (let col = 0; col < nCols; col++) {
    let sumSq = 0;
    for (let row = 0; row < nRows; row++) {
      const diff = matrix[row][col] - means[col];
      sumSq += diff * diff;
    }
    stds[col] = Math.sqrt(sumSq / nRows);
  }

  return stds;
}

function normalizeMatrix(matrix) {
  const means = columnMeans(matrix);
  const stds = columnStd(matrix, means);

  const EPS = 1e-8;
  const validIndices = stds
    .map((std, i) => (std > EPS ? i : null))
    .filter(i => i !== null);

  return matrix.map(row =>
    validIndices.map(i => (row[i] - means[i]) / stds[i])
  );
}

function removeNanEtc(matrix) {
  return matrix.filter(row =>
    row.every(v => Number.isFinite(v))
  );
}



export function cleanData(data) {
    let cleaned = dropNonNumeric(data);
    cleaned = to2DArray(cleaned);
    cleaned = normalizeMatrix(cleaned);
    cleaned = removeNanEtc(cleaned);
    return cleaned;
}