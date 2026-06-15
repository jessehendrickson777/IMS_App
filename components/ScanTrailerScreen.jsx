'use client';

import { useState, useRef, useEffect } from 'react';

const OPERATION_LABELS = {
  load: 'Load Trailer',
  unload: 'Unload Trailer',
};

export default function ScanTrailerScreen({ operationType, onTrailerScanned, onBack }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Please scan or enter a trailer barcode.');
      inputRef.current?.focus();
      return;
    }
    onTrailerScanned(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="screen">
      <header className="header">
        <div className="header-inner">
          <img src="/smilingGCropped.jpg" alt="Company Logo" className="header-logo" />
          <div>
            <h1 className="header-title">IMS</h1>
            <p className="header-subtitle">{OPERATION_LABELS[operationType]}</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="scan-card">
          <p className="scan-instruction">Scan Trailer Barcode</p>
          <p className="scan-hint">Point the scanner at the trailer barcode label.</p>

          <form onSubmit={handleSubmit} className="scan-form">
            <input
              ref={inputRef}
              type="text"
              className="scan-input"
              placeholder="Scan or type barcode..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {error && <p className="input-error">{error}</p>}
            <button type="submit" className="btn btn-confirm btn-full">
              ✓ Confirm Trailer
            </button>
          </form>
        </div>

        <button className="btn btn-back" onClick={onBack}>
          ← Start Over
        </button>
      </main>
    </div>
  );
}
