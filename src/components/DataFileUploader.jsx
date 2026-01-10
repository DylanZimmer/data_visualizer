import React, { useState, useRef } from 'react';
import '../App.css';

const DataFileUploader = ({ onClose, onSwitch, onLoad }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const saveFile = (file) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const csvText = reader.result;

        onLoad({
          name: file.name,
          text: csvText,
          loadedAt: Date.now(),
        });

        setSuccess(true);
      } catch {
        setError('Failed to process CSV.');
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setUploading(false);
      setError('Failed to read the CSV file.');
    };

    reader.readAsText(file);
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      saveFile(selectedFile);
    } else {
      setError('Please select a valid CSV file.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      saveFile(droppedFile);
    } else {
      setError('Please drop a valid CSV file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="uploader">
      <div className="uploader-header">
        <button className="uploader-switch" onClick={onSwitch}>
            Enter Text
        </button>
        <button className="uploader-close" onClick={onClose}>
            ×
        </button>
      </div>

      <h3 className="uploader-title">Upload Data</h3>

      <label
        className={`btn uploader-dropzone ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        {uploading ? 'Uploading...' : 'Select or Drop CSV Here'}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          hidden
          onChange={handleFileSelect}
        />
      </label>

      {success && <p className="uploader-success">Data Loaded</p>}
      {error && <p className="uploader-error">{error}</p>}
    </div>
  );
};

export default DataFileUploader;
