"use client";

import { useState } from "react";
import SelectionScreen from "@/components/SelectionScreen";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import ScanTrailerScreen from "@/components/ScanTrailerScreen";
import ScanBoxesScreen from "@/components/ScanBoxesScreen";

// App stages:
// 'selection'   -> user picks an operation type
// 'confirmation'-> user confirms their choice
// 'scan-trailer'-> (Load/Unload only) user scans the trailer barcode
// 'scan-boxes'  -> user scans individual boxes

export default function Home() {
  const [stage, setStage] = useState("selection");
  const [operationType, setOperationType] = useState(null); // 'load' | 'unload' | 'tipper'
  const [trailerBarcode, setTrailerBarcode] = useState("");
  const [scannedBoxes, setScannedBoxes] = useState([]);

  const handleOperationSelect = (type) => {
    setOperationType(type);
    setStage("confirmation");
  };

  const handleConfirmYes = () => {
    if (operationType === "tipper") {
      setScannedBoxes([]);
      setStage("scan-boxes");
    } else {
      setTrailerBarcode("");
      setScannedBoxes([]);
      setStage("scan-trailer");
    }
  };

  const handleConfirmNo = () => {
    setOperationType(null);
    setStage("selection");
  };

  const handleTrailerScanned = (barcode) => {
    setTrailerBarcode(barcode);
    setStage("scan-boxes");
  };

  const handleBoxScanned = (barcode) => {
    setScannedBoxes((prev) => [
      { barcode, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const handleReset = () => {
    setOperationType(null);
    setTrailerBarcode("");
    setScannedBoxes([]);
    setStage("selection");
  };

  return (
    <div className="app">
      {stage === "selection" && (
        <SelectionScreen onSelect={handleOperationSelect} />
      )}
      {stage === "confirmation" && (
        <ConfirmationScreen
          operationType={operationType}
          onConfirm={handleConfirmYes}
          onBack={handleConfirmNo}
        />
      )}
      {stage === "scan-trailer" && (
        <ScanTrailerScreen
          operationType={operationType}
          onTrailerScanned={handleTrailerScanned}
          onBack={() => setStage("selection")}
        />
      )}
      {stage === "scan-boxes" && (
        <ScanBoxesScreen
          operationType={operationType}
          trailerBarcode={trailerBarcode}
          scannedBoxes={scannedBoxes}
          onBoxScanned={handleBoxScanned}
          onDone={handleReset}
        />
      )}
    </div>
  );
}
