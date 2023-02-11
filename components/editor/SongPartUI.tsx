import React, { useState, useEffect } from "react";
import { Chord, Song, SongPart, Tuning } from "./constants/Types";
import ChordsCanvas from "./ChordsCanvas";
import { CChord, debugAll, getFret, initSongPart, noteNamesSharps } from "./constants/Constants";
import styles from "../../styles/editor/Chords.module.css";

interface SongPartUIProps {
  tuning: Tuning;
  songPart: SongPart; 
  setSongPart: (seq:SongPart) => void;
  chord: Chord;
  setChord: (s: Chord) => void;
}

/**
 * Purpose
 *  - change current chord
 *  -
 * @param param0
 * @returns
 */
const SongPartUI = ({
  tuning,
  songPart,
  setSongPart,
  chord,
  setChord,
}: SongPartUIProps) => {

  const [chordIndex, setChordIndex] = useState<number>(0);
  const [partIndex, setPartIndex] = useState<number>(0);

  const newChord = () => {
    setSongPart({
      ...songPart,
      progression: [...songPart.progression, CChord]
    });
    setChord(CChord);
    if (debugAll) console.log("amendSequence", songPart.progression);
  };

  const saveChord = () => {
    setSongPart({
      ...songPart,
      progression: songPart.progression.map((chord, ix) =>
        chordIndex == ix ? { ...chord, notes: chord.shape } : chord
      ),
    });
    setChord(CChord);
    if (debugAll) console.log("saveChord", songPart.progression);
  };

  const duplicateChord = () => {
    setSongPart({
      ...songPart,
      progression: songPart.progression
        .map((chord, ix) => (chordIndex == ix ? [chord, chord] : chord))
        .flat(),
    });
    setChord(CChord);
    if (debugAll) console.log("saveChord", songPart.progression);
  };

  const deleteChord = () => {
    setSongPart({
      ...songPart,
      progression: songPart.progression
        .map((chord, ix) => (chordIndex == ix ? [] : chord))
        .flat(),
    });
    setChord(CChord);
    if (chordIndex == chord.shape.length) setChordIndex(chordIndex - 1);
    if (debugAll) console.log("deleteChord", songPart.progression);
  };

  const navSequence = (dir: number) => {
    if (chordIndex + dir > songPart.progression.length - 1 || chordIndex + dir < 0)
      return;
    setChordIndex(chordIndex + dir);
    setChord(songPart.progression[chordIndex]);
  };

  useEffect(() => {
    setChord(songPart.progression[chordIndex]);
  }, [chordIndex, songPart.progression]);

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => navSequence(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => navSequence(1)}> {">"} </button>
        <button onClick={() => saveChord()}>Save Chord</button>
        <button onClick={() => duplicateChord()}>Dup Chord</button>
        <button onClick={() => deleteChord()}>Delete Chord</button>
        <button onClick={() => newChord()}>New Chord</button>
      </div>

      <div className={styles.chords}>
        {songPart.progression.map((chord: Chord, index: number) => (
          <div
            onClick={() => {
              setChordIndex(index);
              setChord(songPart.progression[chordIndex]);
            }}
            className={
              index == chordIndex ? styles.chordSelected : styles.chord
            }
            key={index}
          >
            <div>
              {chord.shape.map((n, str) =>
                n == 0 ? "X" : getFret(tuning, str, n)
              )
              .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
            </div>
            <ChordsCanvas chord={chord} tuning={tuning} />
            <div>
              {chord.shape
                .map((note) => note == 0 ? "_" : noteNamesSharps[note % 12])
                .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongPartUI;
