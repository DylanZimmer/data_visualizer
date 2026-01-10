import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { getDataset, updateDatasetName } from '../db/indexedDB';
import { useState, useEffect } from 'react';


const DATASET_QUERY = gql`
  query Dataset($id: ID!) {
    dataset(id: $id) {
      rows
      name
    }
  }
`;

const UPLOAD_DATASET = gql`
  mutation UploadDataset($rows: JSON!) {
    uploadDataset(rows: $rows) {
      id
    }
  }
`;

export function useUploadDataset() {
  const [upload, { loading, error }] = useMutation(UPLOAD_DATASET);

  const uploadDataset = async rawData => {
    const res = await upload({
      variables: { rows: rawData },
    });
    return res.data.uploadDataset.id;
  };

  return { uploadDataset, loading, error };
}

export function useDataset(id) {
  const [dataset, setDataset] = useState(null);
  const [datasetName, setDatasetName] = useState('New Dataset');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getDataset(id).then(data => {
        setDataset(data ? data.rows : null);
        setDatasetName(data ? data.name : 'New Dataset');
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
    } else {
      setDataset(null);
      setDatasetName('New Dataset');
    }
  }, [id]);

  const updateName = async (newName) => {
    if (id) {
      setDatasetName(newName);  // Update state immediately for responsive UI
      try {
        await updateDatasetName(id, newName);
      } catch (error) {
        console.error("Failed to update dataset name:", error);
        // Optionally revert state if needed, but keeping it updated locally for now
      }
    }
  };

  return { dataset, datasetName, loading, error, updateDatasetName: updateName };
}
