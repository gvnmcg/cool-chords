import React, { useState, useEffect } from "react";
import PartMapUI from "./PartMapUI";
import { Chord, Song, SongPart, Tuning } from "./constants/Types";
import { CChord, getFret, initSongPart } from "./constants/Constants";
import ChordsCanvas from "../editor/ChordsCanvas";
import styles from "../../styles/editor/SongMap.module.css";

interface SongMapUIProps {
  tuning: Tuning;
  song: Song;
  setSong: (seq: Song) => void;
  songPart: SongPart;
  setSongPart: (part: SongPart) => void;
  partIndex: number;
  setPartIndex: (ix:number) => void;
  chord: Chord;
  setChord: (s: Chord) => void;
  setChordIndex: (ix:number)=> void;
}

/**
 * Purpose
 *  - change current chord
 *  -
 * @param param0
 * @returns
 */
const SongMapUI = ({
  tuning,
  song,
  setSong,
  songPart,
  setSongPart,
  partIndex,
  setPartIndex,
  chord,
  setChord,
  setChordIndex
}: SongMapUIProps) => {


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
    //   song.parts.map((chord, ix) => (partIndex == ix ? [] : chord)).flat()
    // );
    if (partIndex == chord.shape.length) setPartIndex(partIndex - 1);
  };

  const changePart = (dir: number) => {
    // if (partIndex + dir > song.parts.length - 1 || partIndex + dir < 0)
    //   return;
    // setPartIndex(partIndex + dir);
    // setChord(song.parts[partIndex].notes);
  };

  useEffect(() => {
    setSongPart(song.parts[partIndex])
    setChord(songPart.progression[0]);
    setChordIndex(0)
  }, [partIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.partNav}>
        <button onClick={() => changePart(-1)}> {"<"} </button>
        <span>{partIndex}</span>
        <button onClick={() => changePart(1)}> {">"} </button>

        <button onClick={() => savePart()}>Save Part</button>
        <button onClick={() => amendPart()}>Amend Part</button>
        <button onClick={() => duplicatePart()}>Dup Part</button>
        <button onClick={() => deletePart()}>Delete Part</button>
        <button onClick={() => newPart()}>New Part</button>
      </div>

      <div className={styles.songMap}>
        <div>
          {song.parts.map((part, pix) => (
            <div
              key={pix}
              className={
                pix == partIndex ? styles.partMapSelected : styles.partMap
              }
              onClick={() => {
                setPartIndex(pix);
              }}
            >
              <h3>{part.title}</h3>
              {part.progression.map((chord, chix) => (
                <ChordsCanvas key={chix} chord={chord} tuning={tuning} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongMapUI;
