import React from "react";
import { allFalse, allTrue, scaleNotes } from "../FretboardConstants";
import { ScaleType } from "../FretboardTypes";

interface ScaleControlsProps {
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
}

const ScaleControls = ({ scale, setScale }: ScaleControlsProps) => {
  const toggleScaleNumber = (scaleNumber: number) => {
    let newScale = scale;
    newScale[scaleNumber] = !newScale[scaleNumber];
    setScale(newScale);
  };

  const toggleChord = (chordNum:number) => {
    let newScale = allFalse;
    newScale[chordNum] = true;
    newScale[(chordNum + 2) % 7] = true;
    newScale[(chordNum + 4) % 7] = true;
    setScale(newScale);
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
          setScale(allTrue);
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          setScale(allFalse);
        }}
      >
        nil
      </button>
    </div>
  );
};

export default ScaleControls