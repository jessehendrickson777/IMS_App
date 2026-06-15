"use client";

import { useState, useRef, useEffect } from "react";

const OPERATION_LABELS = {
  load: "Load Trailer",
  unload: "Unload Trailer",
  tipper: "Tipper",
};

export default function ScanBoxesScreen({
  operationType,
  trailerBarcode,
  scannedBoxes,
  onBoxScanned,
  onDone,
}) {
  const [inputValue, setInputValue] = useState("");
  const [lastScanned, setLastScanned] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onBoxScanned(trimmed);
    setLastScanned(trimmed);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="screen screen-boxes">
      <header className="header">
        <div className="header-inner">
          <img
            src="/smilingGCropped.jpg"
            alt="Company Logo"
            className="header-logo"
          />
          <div>
            <h1 className="header-title">IMS</h1>
            <p className="header-subtitle">{OPERATION_LABELS[operationType]}</p>
          </div>
        </div>
      </header>

      {trailerBarcode && (
        <div className="trailer-badge">
          <span className="trailer-badge-label">Trailer:</span>
          <span className="trailer-badge-value">{trailerBarcode}</span>
        </div>
      )}

      <div className="scan-bar">
        <form onSubmit={handleSubmit} className="scan-bar-form">
          <input
            ref={inputRef}
            type="text"
            className="scan-input scan-input-inline"
            placeholder="Scan box barcode..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button type="submit" className="btn btn-scan-add">
            Add
          </button>
        </form>

        {lastScanned && (
          <p className="last-scanned">
            Last: <strong>{lastScanned}</strong>
          </p>
        )}
      </div>

      <div className="scanned-summary">
        <span className="scanned-count">{scannedBoxes.length}</span>
        <span className="scanned-count-label">
          {" "}
          box{scannedBoxes.length !== 1 ? "es" : ""} scanned
        </span>
      </div>

      <div className="scanned-list-container">
        {scannedBoxes.length === 0 ? (
          <p className="empty-list-msg">No boxes scanned yet.</p>
        ) : (
          <ul className="scanned-list">
            {scannedBoxes.map((item, index) => (
              <li
                key={index}
                className={`scanned-item ${index === 0 ? "scanned-item-new" : ""}`}
              >
                <span className="scanned-barcode">{item.barcode}</span>
                <span className="scanned-time">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="done-bar">
        <button className="btn btn-done" onClick={onDone}>
          ✓ Done — Start Over
        </button>
      </div>
    </div>
  );
}
