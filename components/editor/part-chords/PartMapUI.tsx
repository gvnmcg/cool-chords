import React, { useState, useEffect } from "react";

import {
  CChord,
  debugAll,
  getFret,
  initSongPart,
  noteNamesSharps,
} from "../constants/Constants";
import { Chord, Song, SongPart, Tuning } from "../constants/Types";
import ChordsCanvas from "../ChordsCanvas";
import { FiCopy, FiX } from 'react-icons/fi';

import styles from "styles/editor/Chords.module.css";

interface SongPartUIProps {
  tuning: Tuning;
  songPart: SongPart;
  setSongPart: (seq: SongPart) => void;
  chordIndex: number;
  setChordIndex: (ix: number) => void;
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
  chordIndex,
  setChordIndex,
  chord,
  setChord,
}: SongPartUIProps) => {
  const newChord = () => {
    setSongPart({
      ...songPart,
      progression: [...songPart.progression, CChord],
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

  const duplicateChordAt = (index:number) => {
    setSongPart({
      ...songPart,
      progression: songPart.progression
        .map((chord, ix) => (index == ix ? [chord, chord] : chord))
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

  const deleteChordAt = (index:number) => {
    setSongPart({
      ...songPart,
      progression: songPart.progression
        .map((chord, ix) => (index == ix ? [] : chord))
        .flat(),
    });
    setChord(CChord);
    if (chordIndex == chord.shape.length) setChordIndex(chordIndex - 1);
    if (debugAll) console.log("deleteChord", songPart.progression);
  };

  const navSequence = (dir: number) => {
    if (
      chordIndex + dir > songPart.progression.length - 1 ||
      chordIndex + dir < 0
    )
      return;
    setChordIndex(chordIndex + dir);
    setChord(songPart.progression[chordIndex]);
  };

  useEffect(() => {}, [chord]);

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
            className={styles.chord}
            key={index}
          >
            <div className={index == chordIndex ? styles.selected : ""}>
              <div className={styles.chordButtons}> 
                <button className={styles.chordButton} onClick={() => duplicateChordAt(index)}><FiCopy/></button>
                <button className={styles.chordButton} onClick={() => deleteChordAt(index)}><FiX/></button>
              </div>
              <div>
                {chord.shape
                  .map((n, str) => (n == 0 ? "X" : getFret(tuning, str, n)))
                  .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
              </div>
              <ChordsCanvas chord={chord} tuning={tuning} />
              <div>
                {chord.shape
                  .map((note) => (note == 0 ? "_" : noteNamesSharps[note % 12]))
                  .reduce((acc, noteStr) => acc.concat(noteStr + " "), "")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongPartUI;
