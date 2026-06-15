"use client";

const OPERATION_LABELS = {
  load: "Load Trailer",
  unload: "Unload Trailer",
  tipper: "Tipper",
};

export default function ConfirmationScreen({
  operationType,
  onConfirm,
  onBack,
}) {
  const label = OPERATION_LABELS[operationType] ?? operationType;

  return (
    <div className="screen">
      <header className="header">
        <div className="header-inner">
          <img
            src="/smilingGCropped.jpg"
            alt="Company Logo"
            className="header-logo"
          />
          <div>
            <h1 className="header-title">IMS</h1>
            <p className="header-subtitle">Confirm Selection</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="confirm-card">
          <p className="confirm-label">You selected:</p>
          <p className="confirm-selection">{label}</p>
          <p className="confirm-question">Do you want to continue?</p>
        </div>

        <div className="confirm-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>
            ✓ Yes, Continue
          </button>
          <button className="btn btn-cancel" onClick={onBack}>
            ✗ No, Go Back
          </button>
        </div>
      </main>
    </div>
  );
}
