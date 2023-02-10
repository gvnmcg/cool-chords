import React, { useState, useEffect } from "react";
import SongPartUI from "./SongPartUI";
import { Chord, Song, SongPart, Tuning } from "./constants/Types";
import { CChord, getFret, initSongPart } from "./constants/Constants";
import styles from "../styles/Chords.module.css";

interface SongUIProps {
  tuning: Tuning;
  song: Song;
  setSong: (seq: Song) => void;
  songPart: SongPart;
  setSongPart: (part: SongPart) => void;
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
const SongUI = ({
  tuning,
  song,
  setSong,
  songPart,
  setSongPart,
  chord,
  setChord,
}: SongUIProps) => {

  const [chordIndex, setChordIndex] = useState<number>(0);
  const [partIndex, setPartIndex] = useState<number>(0);

  const amendPart = () => {
    setSong({
      ...song,
      parts: [...song.parts, initSongPart]
    });
    setChord(CChord);
  };

  const newPart = () => {
    setSong({
      ...song,
      parts: [...song.parts, initSongPart]
    });
    setChord(CChord);
  };

  const savePart = () => {
    // setSong();
  };

  const duplicatePart = () => {
    // setSong();
  };

  const deletePart = () => {
    // setSong();

    // setChordSequence(
    //   song.parts.map((chord, ix) => (chordIndex == ix ? [] : chord)).flat()
    // );
    if (chordIndex == chord.shape.length) setChordIndex(chordIndex - 1);
  };

  const changePart = (dir: number) => {
    // if (chordIndex + dir > song.parts.length - 1 || chordIndex + dir < 0)
    //   return;
    // setChordIndex(chordIndex + dir);
    // setChord(song.parts[chordIndex].notes);
  };

  useEffect(() => {
    // setChord(song.parts[chordIndex].notes);
  }, [partIndex]);

  return (
    <div>
      <div className={styles.chordNav}>
        <button onClick={() => changePart(-1)}> {"<"} </button>
        <span>{chordIndex}</span>
        <button onClick={() => changePart(1)}> {">"} </button>
        <button onClick={() => savePart()}>Save Part</button>
        <button onClick={() => amendPart()}>Amend Part</button>
        <button onClick={() => duplicatePart()}>Dup Part</button>
        <button onClick={() => deletePart()}>Delete Part</button>
        <button onClick={() => newPart()}>New Part</button>
      </div>

      <div className={styles.chords}>
        {song.parts.map((part: SongPart, index: number) => (
          <SongPartUI 
            songPart={part}
            setSongPart={setSongPart}
            setChord={setChord}
            chord={chord} 
            tuning={tuning} 
          />
        ))}
      </div>
    </div>
  );
};

export default SongUI;
