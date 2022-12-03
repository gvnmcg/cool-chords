import React, { useState } from "react";
import { debug, openChord } from "../FretboardConstants";
import {
  ChordSequenceType,
  ChordType,
  NoteType,
  ScaleType,
  TuningType,
} from "../FretboardTypes";
import styles from "../../../../styles/Scale.module.css";

interface ChordControlsProps {
  tuning: TuningType;
  chordSequence: ChordType[];
  setChordSequence: (sq: ChordType[]) => void;
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

  const amendSequence = () => {
    chordSet.sort((chordA, chordB) => chordB.str - chordA.str);
    let newChord = {
      notes: chordSet,
      slurs: [],
    };
    setChordSequence([...chordSequence, newChord]);
    setChordSet(openChord);
    if (debug) console.log("amendSequence", chordSequence);
  };

  const saveChordSet = () => {
    chordSet.sort((chordA, chordB) => chordB.str - chordA.str);
    let newChord = {
      notes: chordSet,
      slurs: [],
    };
    setChordSequence([...chordSequence, newChord]);
    setChordSet(openChord);
  };

  const navSequence = (dir: number) => {
    if (chordIndex + dir > chordSequence.length || chordIndex + dir < 0) return;
    setChordIndex(chordIndex + dir);
    setChordSet(chordSequence[chordIndex].notes);
  };

  return (
    <div >
      <div>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => amendSequence()} >
          Set Chord
        </button>
      </div>

      <div className={styles.chords}>
        {chordSequence.map((chord: ChordType, index: number) => (
          <div className={styles.chord} key={index}>
            <div>{chord.notes.map((n) => n.fret)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordControls;
