import React, { useState, useEffect } from "react";
import { debug, getFret, noteNames, chordDebug } from "../utils/FretboardConstants";
import { ChordArr, TuningType } from "./types/FretboardTypes";
import styles from "../styles/Chords.module.css";
import ChordsCanvas from "./ChordsCanvas";

interface SequenceControlsProps {
  tuning: TuningType;
  chordSequence: ChordArr[];
  setChordSequence: (sq: ChordArr[]) => void;
  chordSet: number[];
  setChordSet: (s: number[]) => void;
}

/**
 * Purpose
 *  - change current chord
 *  -
 * @param param0
 * @returns
 */
const SequenceControls = ({
  tuning,
  chordSequence,
  setChordSequence,
  chordSet,
  setChordSet,
}: SequenceControlsProps) => {
  const [chordIndex, setChordIndex] = useState<number>(0);

  const amendSequence = () => {
    setChordSequence([
      ...chordSequence,
      {
        notes: chordSet,
        riff: [[]],
      },
    ]);
    setChordSet([]);
    if (debug) console.log("amendSequence", chordSequence);
  };

  const newChord = () => {
    setChordSequence([
      ...chordSequence,
      {
        notes: [0,0,0,0,0,0],
        riff: [[]],
      },
    ]);
    setChordSet([]);
    if (debug) console.log("amendSequence", chordSequence);
  };

  const saveChordSet = () => {
    setChordSequence(
      chordSequence.map((chord, ix) =>
        chordIndex == ix ? { ...chord, notes: chordSet } : chord
      )
    );
  };

  const duplicateChord = () => {
    setChordSequence(
      chordSequence
        .map((chord, ix) =>
          chordIndex == ix ? [chord, { notes: chordSet, riff: [[]] }] : chord
        )
        .flat()
    );
  };

  const deleteChord = () => {
    setChordSequence(
      chordSequence.map((chord, ix) => (chordIndex == ix ? [] : chord)).flat()
    );
    if (chordIndex == chordSet.length) setChordIndex(chordIndex - 1);
  };

  const navSequence = (dir: number) => {
    if (chordIndex + dir > chordSequence.length - 1 || chordIndex + dir < 0)
      return;
    setChordIndex(chordIndex + dir);
    setChordSet(chordSequence[chordIndex].notes);
  };

  useEffect(() => {
    setChordSet(chordSequence[chordIndex].notes);
  }, [chordIndex, chordSequence]);

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => saveChordSet()}>Save Chord</button>
        <button onClick={() => amendSequence()}>Amend Chord</button>
        <button onClick={() => duplicateChord()}>Dup Chord</button>
        <button onClick={() => deleteChord()}>Delete Chord</button>
        <button onClick={() => newChord()}>New Chord</button>
      </div>

      <div className={styles.chords}>
        {chordSequence.map((chord: ChordArr, index: number) => (
          <div
            onClick={() => {
              setChordIndex(index);
              setChordSet(chordSequence[chordIndex].notes);
            }}
            className={
              index == chordIndex ? styles.chordSelected : styles.chord
            }
            key={index}
          >
            <div>
              {chord.notes.map((n, str) =>
                n == 0 ? "X" : getFret(tuning, str, n)
              )
              .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
            </div>
            <ChordsCanvas chordSet={chord.notes} tuning={tuning} />
            <div>
              {chord.notes
                .map((note) => note == 0 ? "_" : noteNames[note % 12])
                .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceControls;
