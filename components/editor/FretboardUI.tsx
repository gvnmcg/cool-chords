import React, { useState } from "react";
import { Chord, ScaleChord, ScaleIntervals, Tuning } from "./constants/Types";

import styles from "../../styles/editor/Fretboard.module.css";
import FretboardCanvas from "./FretboardCanvas";
import { debugAll } from "./constants/Constants";



const FRET_SPACING = 30;
const STR_SPACING = 20;
const MARGIN = 30;
const FRET_COUNT = 15;

const WIDTH = STR_SPACING * 6 + MARGIN * 2;
const HEIGHT = FRET_SPACING * FRET_COUNT + MARGIN * 2;


const fretboardDebug: boolean = debugAll || false;

interface FretboardUIProps {
  play: (str:number, when:number) => void
  tuning: Tuning;
  keyTonic: number;
  scale: ScaleIntervals;
  scaleChord: ScaleChord;
  chord: Chord;
  setChord: (ch: Chord) => void;
}

const FretboardUI = ({
  play,
  tuning,
  keyTonic,
  scale,
  scaleChord,
  chord,
  setChord,
}: FretboardUIProps) => {

  const [orientation, setOrientation] = useState<boolean>(true);
  const [riffMode, setRiffMode] = useState<boolean>(false);


  const updateChord = (str: number, newNote: number) => {
    // constrain to one per string
    setChord(
      {...chord, shape: chord.shape.map((note, i) =>
        str !== i ? note : newNote !== note ? newNote : 0
      )}
    );
  };
  

  return (
    <div className={styles.fretboardContainer}>
      {/* <button
        onClick={() => {
          chord.shape.forEach((n, i) => {
            play(i, i / 4);
          });
        }}
      >
        Strum
      </button> */}

      <FretboardCanvas
        play={play}
        updateChord={updateChord}
        keyTonic={keyTonic}
        scale={scale}
        scaleChord={scaleChord}
        chord={chord}
        riffMode={riffMode}
        tuning={tuning}
      />
    </div>
  );
};

export default FretboardUI;
