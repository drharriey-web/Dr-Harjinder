import { useState } from "react";
import "./App.css";

function EntryScreen({ onEnter }) {
  return (
    <div className="screen entry">
      <div className="entry-content">
        <div className="icon-placeholder"></div>

        <h1 className="title">VANTAGE</h1>

        <h2 className="subtitle">Guided by Dr.Harriey</h2>

        <p className="body-text">
          This is not a therapy app.
          <br />
          This is a perception instrument.
          <br />
          Before emotion.
          <br />
          Before reaction.
          <br />
          Before decision.
          <br />
          Pause and observe.
        </p>
      </div>

      <button className="primary-button" onClick={onEnter}>
        ENTER
      </button>
    </div>
  );
}

function SingleLineInput({ label, value, onChange }) {
  const handleChange = (e) => {
    // Remove newline characters explicitly
    const sanitized = e.target.value.replace(/[\r\n]/g, "");
    onChange(sanitized);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="card">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={140}
      />
    </div>
  );
}

function PerceptionScreen({ onEnter }) {
  // Load from localStorage or default to empty string
  const [observation, setObservation] = useState(() => localStorage.getItem("observation") || "");
  const [assumption, setAssumption] = useState(() => localStorage.getItem("assumption") || "");
  const [unknown, setUnknown] = useState(() => localStorage.getItem("unknown") || "");

  // Save to localStorage on change
  const handleObservationChange = (val) => {
    setObservation(val);
    localStorage.setItem("observation", val);
  };

  const handleAssumptionChange = (val) => {
    setAssumption(val);
    localStorage.setItem("assumption", val);
  };

  const handleUnknownChange = (val) => {
    setUnknown(val);
    localStorage.setItem("unknown", val);
  };

  const onReset = () => {
    setObservation("");
    setAssumption("");
    setUnknown("");
    localStorage.removeItem("observation");
    localStorage.removeItem("assumption");
    localStorage.removeItem("unknown");
  };

  const isComplete =
    observation.length > 0 &&
    assumption.length > 0 &&
    unknown.length > 0;

  return (
    <div className="screen perception">
      <h1 className="title top">Perception Check</h1>

      <p className="instruction">
        Separate what is observed from what is assumed.
      </p>

      <div className="cards">
        <SingleLineInput
          label="Observation"
          value={observation}
          onChange={handleObservationChange}
        />

        <SingleLineInput
          label="Assumption"
          value={assumption}
          onChange={handleAssumptionChange}
        />

        <SingleLineInput
          label="Unknown"
          value={unknown}
          onChange={handleUnknownChange}
        />
      </div>
      <div className="buttons-container">
        <button
          className="primary-button"
          onClick={onReset}
        >
          RESET
        </button>

        <button
          className="primary-button"
          disabled={!isComplete}
          onClick={onEnter}
        >
          PAUSE
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);

  return entered ? (
    <PerceptionScreen onEnter={() => setEntered(false)} />
  ) : (
    <EntryScreen onEnter={() => setEntered(true)} />
  );
}