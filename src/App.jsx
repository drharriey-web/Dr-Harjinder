import { useState } from "react";
import "./App.css";

function EntryScreen({ onEnter }) {
  return (
    <div className="screen entry">
      <div className="entry-content">
        <div className="icon-placeholder"></div>

        <h1 className="title">ENTRY</h1>
        <h2 className="subtitle">Guided by Dr.Harriey</h2>

        <p className="body-text">
          This is not a productivity tool.
          <br />
          This screen exists only to pause the user.
        </p>
      </div>

      <button className="primary-button" onClick={onEnter}>
        ENTER
      </button>
    </div>
  );
}

function PerceptionScreen() {
  const [inputs, setInputs] = useState({
    observation: "",
    assumption: "",
    unknown: "",
  });

  const isComplete =
    inputs.observation && inputs.assumption && inputs.unknown;

  const handleChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  return (
    <div className="screen perception">
      <h1 className="title top">Perception Check</h1>

      <p className="instruction">
        Separate what is observed from what is assumed.
      </p>

      <div className="cards">
        <div className="card">
          <label>Observation</label>
          <input
            type="text"
            value={inputs.observation}
            onChange={(e) => handleChange("observation", e.target.value)}
          />
        </div>

        <div className="card">
          <label>Assumption</label>
          <input
            type="text"
            value={inputs.assumption}
            onChange={(e) => handleChange("assumption", e.target.value)}
          />
        </div>

        <div className="card">
          <label>Unknown</label>
          <input
            type="text"
            value={inputs.unknown}
            onChange={(e) => handleChange("unknown", e.target.value)}
          />
        </div>
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
