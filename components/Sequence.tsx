import React from "react";
import Upload from "./Upload";
import Download from "./Download";
import {
  ChordArr,
  TuningType,
} from "./types/FretboardTypes";

interface SequenceControlsProps {
  tuning: TuningType;
  chordSequence: ChordArr[];
  setChordSequence: (list: ChordArr[]) => void;
}

const SequenceControls = ({
  tuning,
  chordSequence,
  setChordSequence,
}: SequenceControlsProps) => {
  return (
    <div>
      {/* <Upload setChordSequence={setChordSequence} /> */}
      <Download
        chordSequence={chordSequence}
      />
    </div>
  );
};

export default SequenceControls;
