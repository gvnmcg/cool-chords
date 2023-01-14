import React, { useEffect, useState } from "react";
import { allFalse, allTrue, debug, noteNames, noteNamesFlats, noteNamesSharps, scaleIntervals, scaleNotes } from "./FretboardConstants";
import { ScaleChordType, ScaleType } from "../utils/FretboardTypes";
import styles from "../styles/Scale.module.css"

interface ScaleControlsProps {
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
  scaleChord: ScaleChordType;
  setScaleChord: (scaleChord: ScaleChordType) => void
  accidentals: number;
  setAccidentals: (scale:number) => void
}

const chordQualities = ["", "m", "m","","","m","dim", ]

const ScaleControls = ({ scale, setScale, scaleChord, setScaleChord, accidentals, setAccidentals }: ScaleControlsProps) => {

  const [noteNamesArr , setNoteNamesArr] = useState<string[]>(noteNames);
  const [keyIndex , setKeyIndex] = useState<number>(0);

  const toggleScaleNumber = (scaleNumber: number) => {
    setScaleChord( scaleChord.map( (s,i) => i == scaleNumber ? !s : s))
    // if (debug) console.log("toggle scale", scaleChord);
  };

  const toggleChord = (chordNum:number) => {
    setScaleChord( scaleChord.map((s, i) => i == chordNum 
      || i == (chordNum + 2) % 7
      || i == (chordNum + 4) % 7|| false))
    // if (debug) console.log("toggle chord", scaleChord);
  };

  const getKeyName = (accidentals: number) => {
    if (accidentals > 0) {
      return noteNamesArr[Math.abs((accidentals * 7) % 12)]
    } else {
      return noteNamesArr[Math.abs((accidentals * 5) % 12)]
    }
  }

  useEffect(() => {

    setNoteNamesArr(accidentals >= 0 ? noteNamesSharps : noteNamesFlats)
    if (accidentals >= 0) {
      setKeyIndex(Math.abs((accidentals * 7) % 12))
    } else {
      setKeyIndex(Math.abs((accidentals * 5) % 12))
    }

    setScale(scale.map(interval => (interval + keyIndex) % 12))
    
  }, [accidentals])

  return (
    <div className={styles.scale}>
      <div className={styles.key}>
        {getKeyName(accidentals)}
        <button onClick={() => setAccidentals(accidentals - 1)}> - </button>
        <button onClick={() => setAccidentals(accidentals + 1)}> + </button>
      </div>

      <div className={styles.chords}>
      {/* subset */}
      {scaleIntervals.map((interval, i) => (
        <div className={styles.chord} key={i}>
          <button
            onClick={() => {
              toggleChord(i);
            }}
          >
            {noteNamesArr[(interval + keyIndex) % 12]  + chordQualities[i]}
          </button>
          
        </div>
      ))}
      
      <button
        onClick={() => {
          setScaleChord(scaleChord.map(() => true));
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          setScaleChord(scaleChord.map(() => false));
        }}
      >
        nil
      </button>
    </div>
    </div>
    
  );
};

export default ScaleControls