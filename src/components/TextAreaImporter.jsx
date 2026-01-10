import React, { useState } from 'react';
import '../App.css';

const TextAreaImporter = ({ onLoad, onSwitch, onClose }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleImport = () => {
    setError(null);

    try {
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Data must be a non-empty array');
      }

      if (typeof parsed[0] !== 'object') {
        throw new Error('Each row must be an object');
      }

      onLoad(parsed);
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid JSON');
    }
  };

  return (
    <div className="uploader">
      <div className="uploader-header">
        <button className="uploader-switch" onClick={onSwitch}>
            Import File
        </button>
        <button className="uploader-close" onClick={onClose}>
            ×
        </button>
      </div>

      <h3 className="uploader-title">Paste Data (JSON)</h3>

      <textarea
        className="textbox-importer"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste JSON array here..."
        spellCheck={false}
      />

      <button className="btn btn-white" onClick={handleImport}>
        Import Data
      </button>

      {error && <p className="uploader-error">{error}</p>}
    </div>
  );
};

export default TextAreaImporter;
