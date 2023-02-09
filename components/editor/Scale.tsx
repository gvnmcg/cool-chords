import React, { useEffect, useState } from "react";
import {
  debug,
  noteNames,
  noteNamesFlats,
  noteNamesSharps,
  scaleIntervals,
  chordQualities
} from "../utils/FretboardConstants";
import { ScaleChordType, ScaleType } from "./types/FretboardTypes";
import styles from "../styles/Scale.module.css";

interface ScaleControlsProps {
  keyNote:number;
  setKeyNote:(key:number) => void
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
  scaleChord: ScaleChordType;
  setScaleChord: (scaleChord: ScaleChordType) => void;
  accidentals: number;
  setAccidentals: (scale: number) => void;
}


const ScaleControls = ({
  keyNote,
  setKeyNote,
  scale,
  setScale,
  scaleChord,
  setScaleChord,
  accidentals,
  setAccidentals,
}: ScaleControlsProps) => {
  const [noteNamesArr, setNoteNamesArr] = useState<string[]>(noteNames);

  const toggleScaleNumber = (scaleNumber: number) => {
    setScaleChord(scaleChord.map((s, i) => (i == scaleNumber ? !s : s)));
  };

  const toggleChord = (chordNum: number) => {
    setScaleChord(
      scaleChord.map(
        (s, i) =>
          i == chordNum ||
          i == (chordNum + 2) % 7 ||
          i == (chordNum + 4) % 7 ||
          false
      )
    );
  };

  useEffect(() => {
    setScale(scaleIntervals.map((interval) => (interval + keyNote) % 12));
    if (keyNote == -1) setKeyNote(11)
  }, [keyNote, accidentals]);

  return (
    <div className={styles.scale}>
      <span>Key: </span>
      <span className={styles.key}>
        <button onClick={() => setKeyNote((keyNote - 1) % 12)}> - </button>
        <button onClick={() => setKeyNote((keyNote + 1) % 12)}> + </button>
        {noteNamesArr[keyNote]}
      </span>
       
      <div className={styles.chords}>

      <div>
         <button
         className={styles.resetButton}
         onClick={() => {
           setScaleChord(scaleChord.map(() => true));
          }}
          >
          all
        </button>
        <button
          className={styles.resetButton}
          onClick={() => {
            setScaleChord(scaleChord.map(() => false));
          }}
        >
          nil
        </button>

      </div>
        {/* subset */}
        {scaleIntervals.map((interval, i) => (
          <div className={styles.chord} key={i}>
            <span>{i+1}</span>
            {noteNamesArr[(interval + keyNote) % 12] + chordQualities[i]}
            <button
              onClick={() => {
                toggleChord(i);
              }}
            >
            -  
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ScaleControls;
