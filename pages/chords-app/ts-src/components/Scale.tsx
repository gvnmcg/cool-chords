import React, { useEffect, useState } from "react";
import { allFalse, allTrue, debug, noteNames, noteNamesFlats, noteNamesSharps, scaleIntervals, scaleNotes } from "../FretboardConstants";
import { ScaleType } from "../FretboardTypes";
import styles from "../../../../styles/Scale.module.css"

interface ScaleControlsProps {
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
  scaleKey: number;
  setScaleKey: (scale:number) => void
}

const ScaleControls = ({ scale, setScale, scaleKey, setScaleKey }: ScaleControlsProps) => {

  const [noteNamesArr , setNoteNamesArr] = useState<string[]>(noteNames);
  const [noteNamesKeyIndex , setNoteNamesKeyIndex] = useState<number>(0);

  const toggleScaleNumber = (scaleNumber: number) => {
    setScale( scale.map( (s,i) => i == scaleNumber ? !s : s))
    if (debug) console.log("toggle scale", scale);
  };

  const toggleChord = (chordNum:number) => {
    setScale( scale.map((s, i) => i == chordNum 
      || i == (chordNum + 2) % 7
      || i == (chordNum + 4) % 7|| false))
    if (debug) console.log("toggle chord", scale);
  };

  const getKeyName = (accidentals: number) => {
    if (accidentals > 0) {
      return noteNamesArr[Math.abs((accidentals * 7) % 12)]
    } else {
      return noteNamesArr[Math.abs((accidentals * 5) % 12)]
    }
  }

  
  // const getKeyName = (accidentals: number) => {
  //   if (accidentals > 0) {
  //     setNoteNamesKeyIndex(Math.abs((accidentals * 7) % 12))
  //   } else {
  //     setNoteNamesKeyIndex(Math.abs((accidentals * 5) % 12))
  //   }
  //   return noteNamesArr[noteNamesKeyIndex]
  // }
  // const set
  useEffect(() => {
    setNoteNamesArr(scaleKey >= 0 ? noteNamesSharps : noteNamesFlats)
    if (scaleKey >= 0) {
      setNoteNamesKeyIndex(Math.abs((scaleKey * 7) % 12))
    } else {
      setNoteNamesKeyIndex(Math.abs((scaleKey * 5) % 12))
    }
    // setScale(allFalse.map( (b:boolean, ix:number) => {
    //   (scaleIntervals[ix] + noteNamesKeyIndex) % 12 
    // }))
    
  }, [scaleKey])

  return (
    <div className={styles.scale}>
      <div className={styles.key}>
        {getKeyName(scaleKey)}
        <button onClick={() => setScaleKey(scaleKey - 1)}> - </button>
        <button onClick={() => setScaleKey(scaleKey + 1)}> + </button>
      </div>

      <div className={styles.chords}>
      {/* subset */}
      {scaleIntervals.map((ch, i) => (
        <div className={styles.chord} key={i}>
          <button
            onClick={() => {
              toggleChord(i);
            }}
          >
            {noteNamesArr[(ch + noteNamesKeyIndex) % 12]}
          </button>
          <input
            type="checkbox"
            checked={scale[i]}
            onChange={(e) => {
              toggleScaleNumber(i);
            }}
          />

          
        </div>
      ))}
      
      <button
        onClick={() => {
          setScale(scale.map(() => true));
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          setScale(scale.map(() => false));
        }}
      >
        nil
      </button>
    </div>
    </div>
    
  );
};

export default ScaleControls