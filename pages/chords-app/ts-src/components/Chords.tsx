import React, { useState } from "react";
import { openChord } from "../FretboardConstants";
import {
  ChordSequenceType,
  ChordType,
  NoteType,
  ScaleType,
  TuningType,
} from "../FretboardTypes";

interface ChordControlsProps {
  tuning: TuningType;
  chordSequence: ChordSequenceType;
  setChordSequence: (sq: ChordSequenceType) => void;
  setScaleChord: (s: ScaleType) => void;
  chordSet: NoteType[];
  setChordSet: (s: NoteType[]) => void;
  slurs: NoteType[];
}

/**
 * Purpose
 *  - change current chord
 *  -
 * @param param0
 * @returns
 */
const ChordControls = ({
  tuning,
  chordSequence,
  setChordSequence,
  setScaleChord,
  chordSet,
  setChordSet,
  slurs,
}: ChordControlsProps) => {
  const [chordIndex, setChordIndex] = useState<number>(0);
  return (
    <div>
      <button
        onClick={() => {
          chordSet.sort((chordA, chordB) => chordB.str - chordA.str);
          let newChord = {
            notes: chordSet,
            slurs: [],
          };
          setChordSequence([...chordSequence, newChord]);
          setChordSet(openChord);
        }}
      >
        Set Chord
      </button>
      {chordSequence.map((chord: ChordType, index: number) => (
        <div key={index}>
          <div>{chord.notes.map((n) => n.fret)}</div>
        </div>
      ))}
    </div>
  );
};

export default ChordControls;
