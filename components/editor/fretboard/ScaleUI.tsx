import React, { useEffect, useState } from "react";

import { ScaleChord, ScaleIntervals } from "../constants/Types";
import {
  chordQualities,
  debugAll,
  noteNamesSharps,
} from "../constants/Constants";

import styles from "styles/editor/Scale.module.css";

const scaleDebug: boolean = debugAll || false;

interface ScaleUIProps {
  keyTonic: number;
  setKeyTonic: (key: number) => void;
  scale: ScaleIntervals;
  setScale: (scale: ScaleIntervals) => void;
  scaleChord: ScaleChord;
  setScaleChord: (scaleChord: ScaleChord) => void;
}

const ScaleUI = ({
  keyTonic,
  setKeyTonic,
  scale,
  setScale,
  scaleChord,
  setScaleChord,
}: ScaleUIProps) => {
  const [noteNamesArr, setNoteNamesArr] = useState<string[]>(noteNamesSharps);

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
    setScale(scale.map((interval) => (interval + keyTonic) % 12));
    if (keyTonic == -1) setKeyTonic(11);
  }, [keyTonic]);

  return (
    <div className={styles.scale}>
      <span>Key: </span>
      <span className={styles.key}>
        <button onClick={() => setKeyTonic((keyTonic - 1) % 12)}> - </button>
        <button onClick={() => setKeyTonic((keyTonic + 1) % 12)}> + </button>
        {noteNamesArr[keyTonic]}
      </span>

      <div className={styles.chords}>
        <div>
          <button
            //  className={styles.resetButton}
            onClick={() => {
              setScaleChord(scaleChord.map(() => true));
            }}
          >
            all
          </button>
          <button
            // className={styles.resetButton}
            onClick={() => {
              setScaleChord(scaleChord.map(() => false));
            }}
          >
            nil
          </button>
        </div>
        {/* subset */}
        {scale.map((interval, i) => (
          <div className={styles.chord} key={i}>
            <span>{i + 1}</span>
            {noteNamesArr[(interval + keyTonic) % 12] + chordQualities[i]}
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

export default ScaleUI;
