'use client';

import { PiTruckTrailerFill } from 'react-icons/pi';
import { FaBoxes } from 'react-icons/fa';
import { AiOutlineRotateRight } from 'react-icons/ai';

const OPERATIONS = [
  { key: 'load', label: 'Load Trailer', icon: <PiTruckTrailerFill /> },
  { key: 'unload', label: 'Unload Trailer', icon: <FaBoxes /> },
  { key: 'tipper', label: 'Tipper', icon: <AiOutlineRotateRight /> },
];

export default function SelectionScreen({ onSelect }) {
  return (
    <div className="screen">
      <header className="header">
        <div className="header-inner">
          <img src="/smilingGCropped.jpg" alt="Company Logo" className="header-logo" />
          <div>
            <h1 className="header-title">IMS</h1>
            <p className="header-subtitle">Forklift Operations</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <p className="instruction-text">Select an operation to begin:</p>

        <div className="operation-buttons">
          {OPERATIONS.map(({ key, label, icon }) => (
            <button
              key={key}
              className="operation-btn"
              onClick={() => onSelect(key)}
            >
              <span className="operation-icon">{icon}</span>
              <span className="operation-label">{label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
