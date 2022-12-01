import React from "react";
import { allFalse, allTrue, debug, scaleNotes } from "../FretboardConstants";
import { ScaleType } from "../FretboardTypes";

interface ScaleControlsProps {
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
}

const ScaleControls = ({ scale, setScale }: ScaleControlsProps) => {
  const toggleScaleNumber = (scaleNumber: number) => {
    setScale( scale.map( (s,i) => i == scaleNumber ? !s : s))
    if (debug) console.log("toggle scale", scale);
  };

  const toggleChord = (chordNum:number) => {
    setScale( scale.map((s, i) => i == chordNum 
      || i == (chordNum + 2) % 7
      || i == (chordNum + 4) % 7|| false))
    if (debug) console.log("toggle chord", scale);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {scaleNotes.map((ch, i) => (
        <div key={i}>
          {ch}
          <br />
          {i + 1}
          <input
            type="checkbox"
            checked={scale[i]}
            onChange={(e) => {
              toggleScaleNumber(i);
            }}
          />

          <button
            onClick={() => {
              toggleChord(i);
            }}
          >
            {ch}
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setScale(scale.map(() => true));
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          setScale(scale.map(() => false));
        }}
      >
        nil
      </button>
    </div>
  );
};

export default ScaleControls