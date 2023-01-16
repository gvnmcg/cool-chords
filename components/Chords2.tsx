import React, { useState, useEffect } from "react";
import { debug, getFret, noteNames } from "./FretboardConstants";
import {
  ChordSequenceType,
  ChordArr,
  NoteType,
  ScaleType,
  TuningType,
} from "../utils/FretboardTypes";
import styles from "../styles/Chords.module.css";
import ChordsCanvas2 from "./ChordsCanvas2";

interface ChordArrayControlsProps {
  tuning: TuningType;
  chordSequence: ChordArr[];
  setChordSequence: (sq: ChordArr[]) => void;
  chordSet: number[];
  setChordSet: (s: number[]) => void;
}

const chordDebug: boolean = debug || true;

/**
 * Purpose
 *  - change current chord
 *  -
 * @param param0
 * @returns
 */
const ChordArrayControls = ({
  tuning,
  chordSequence,
  setChordSequence,
  chordSet,
  setChordSet,
}: ChordArrayControlsProps) => {
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

  const navSequence = (dir: number) => {
    if (chordIndex + dir > chordSequence.length - 1 || chordIndex + dir < 0)
      return;
    setChordIndex(chordIndex + dir);
    setChordSet(chordSequence[chordIndex].notes);
  };

  useEffect(() => {
    // previous chord state, same midi
    // new frets on each string to tuning midi

    // if the tuning changed
    //redraw canvas

    // if the index changed
    setChordSet(chordSequence[chordIndex].notes);
  }, [chordIndex]);

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => saveChordSet()}>Save Chord</button>
        <button onClick={() => amendSequence()}>Amend Chord</button>
        <button onClick={() => duplicateChord()}>Dup Chord</button>
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
            <div>{chord.notes.map((n, str) => getFret(tuning, str, n))}</div>
            <ChordsCanvas2 chordSet={chord.notes} tuning={tuning} />
            <div>
              {chord.notes.reduce(
                (acc, note) => acc.concat(noteNames[note % 12] + " "),
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordArrayControls;
