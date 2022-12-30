import React, { useState, useEffect } from "react";
import { debug, noteNames, openChord } from "../FretboardConstants";
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
    setChordSequence(
      chordSequence.map((chord, ix) =>
        ix == chordIndex ? { ...chord, notes: chordSet } : chord
      )
    );
  };

  const navSequence = (dir: number) => {
    if (chordIndex + dir > chordSequence.length - 1 || chordIndex + dir < 0)
      return;
    setChordIndex(chordIndex + dir);
    setChordSet(chordSequence[chordIndex].notes);
  };

  useEffect(() => {
    // previous chord state, same midi
    // new frets on each string to tuning midi

    // setChordSet(
    //   chordSet.map((note) => {
    //     let newFret = note.midi - tuning[note.str];
    //     // if (newFret < 0) return note;
    //     return { ...note, fret: newFret };
    //   })
    // );

    setChordSequence(chordSequence.map((chord, ix) => {
      let newFrets = chord.notes.map((note) => {
        let newFret = note.midi - tuning[note.str];
        // if (newFret < 0) return note;
        return { ...note, fret: newFret };
      })
      return {...chord, notes: newFrets}
    }))

    if (!chordDebug) return
    console.log("-----------------------------------------------------");
    console.log("ChordControls => @useEffect .chordIndex", chordIndex);
    console.log("ChordControls => @useEffect .chordSet", chordSet);
    console.log("ChordControls => @useEffect .tuning", tuning);
    console.log("ChordControls => @useEffect fret Arr", chordSet.map((n) => n.fret));
    
  }, [tuning, chordIndex]);

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => saveChordSet()}>Save Chord</button>
        <button onClick={() => amendSequence()}>Amend Chord</button>
      </div>

      <div className={styles.chords}>
        {chordSequence.map((chord: ChordType, index: number) => (
          <div
            onClick={() => {
              setChordIndex(index);
              setChordSet(chordSequence[chordIndex].notes);
              if (!chordDebug) return
              console.log("-----------------------------------------------------");
              console.log("ChordControls => @onclick .chordIndex", chordIndex);
              console.log("ChordControls => @onclick .chordSet", chordSet);
              console.log("ChordControls => @onclick .tuning", tuning);
              console.log("ChordControls => @onclick fret Arr", chordSet.map((n) => n.fret));
              
            }}
            className={
              index == chordIndex ? styles.chordSelected : styles.chord
            }
            key={index}
          >
            <div>{chord.notes.map((n) => n.fret)}</div>
            <ChordsCanvas chordSet={chord.notes} tuning={tuning} />
            {chord.notes.map((note,ix) => noteNames[note.midi % 12])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordControls;
