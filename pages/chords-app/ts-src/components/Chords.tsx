import React, { useState, useEffect } from "react";
import { debug, openChord } from "../FretboardConstants";
import {
  ChordSequenceType,
  ChordType,
  NoteType,
  ScaleType,
  TuningType,
} from "../FretboardTypes";
import styles from "../../../../styles/Chords.module.css";
import ChordsCanvas from "./ChordsCanvas";

interface ChordControlsProps {
  tuning: TuningType;
  chordSequence: ChordType[];
  setChordSequence: (sq: ChordType[]) => void;
  chordSet: NoteType[];
  setChordSet: (s: NoteType[]) => void;
}

const chordDebug: boolean = debug || false;

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
  chordSet,
  setChordSet,
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
    if (chordIndex + dir > chordSequence.length-1 || chordIndex + dir < 0) return;
    setChordIndex(chordIndex + dir);
    setChordSet(chordSequence[chordIndex].notes);
  };

  useEffect(() => {
    // previous chord state, same midi
    // new frets on each string to tuning midi
    setChordSet(chordSet.map((note) => {
        return {...note, fret: note.midi - tuning[note.str] }
      }
    ))
    if (chordDebug) {
      console.log("change tuning effect chords", chordSet )
      console.log("change tuning effect note diff", chordSet.forEach((note, ix) => {
        console.log(note.midi, " - ", tuning[note.str], " = ", note.midi - tuning[note.str])
      }) )
    }
  }, [tuning])

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => amendSequence()}>Set Chord</button>
      </div>

      <div className={styles.chords}>
        {chordSequence.map((chord: ChordType, index: number) => (
          <div
            onClick={()=> {
              setChordIndex(index);
              setChordSet(chordSequence[chordIndex].notes)
            }}
            className={
              index == chordIndex ? styles.chordSelected : styles.chord
            }
            key={index}
          >
            <div>{chord.notes.map((n) => n.fret)}</div>
            <ChordsCanvas chordSet={chord.notes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordControls;
