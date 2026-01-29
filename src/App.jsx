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

function PerceptionScreen() {
  const [observation, setObservation] = useState("");
  const [assumption, setAssumption] = useState("");
  const [unknown, setUnknown] = useState("");

  const isComplete =
    observation.length > 0 &&
    assumption.length > 0 &&
    unknown.length > 0;

  return (
    <div className="screen perception">
      <h1 className="title top">Perception Check</h1>

      <p className="instruction">
        Separate what you see from what you think.
      </p>

      <div className="cards">
        <SingleLineInput
          label="Observation"
          value={observation}
          onChange={setObservation}
        />

        <SingleLineInput
          label="Assumption"
          value={assumption}
          onChange={setAssumption}
        />

        <SingleLineInput
          label="Unknown"
          value={unknown}
          onChange={setUnknown}
        />
      </div>

      <button
        className="primary-button"
        disabled={!isComplete}
      >
        PAUSE
      </button>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);

  return entered ? (
    <PerceptionScreen />
  ) : (
    <EntryScreen onEnter={() => setEntered(true)} />
  );
}
