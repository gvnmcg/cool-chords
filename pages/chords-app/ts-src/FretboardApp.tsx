import React, { useState } from "react";
import TuningControls from "./components/Tuning";
import ScaleControls from "./components/Scale";
import FretboardCanvas from "./FretboardCanvas";
import {
  ChordSequenceType,
  ChordType,
  FBStateType,
  NoteType,
  ScaleChordType,
  ScaleKeyType,
  ScaleType,
  SlursType,
  TuningType,
} from "./FretboardTypes";
import {
  allTrue,
  initChordNote,
  initChordSequence,
  openChord,
  standardTuning,
} from "./FretboardConstants";
import ChordControls from "./components/Chords";
import styles from '../../../styles/Home.module.css'


/**
 *
 */
const FretboardApp = () => {
  // const [state, setState] = useState(initFBState);

  // Chord System
  const [chordSequence, setChordSequence] =
    useState<ChordType[]>(initChordSequence);
  const [chordSet, setChordSet] = useState<NoteType[]>(initChordSequence[0].notes);
  const [slurs, setSlurs] = useState<SlursType>([]);

  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>(standardTuning);
  const [scale, setScale] = useState<ScaleType>(allTrue);
  const [scaleKey, setScaleKey] = useState<ScaleKeyType>(0);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>(allTrue);

  return (
    <div className={styles.main}>
      <div className={styles.chordSequence}>
        <ChordControls
          tuning={tuning}
          chordSequence={chordSequence}
          setChordSequence={setChordSequence}
          chordSet={chordSet}
          setChordSet={setChordSet}
        />
      </div>

      <div className={styles.fretboard}>
        <TuningControls tuning={tuning} setTuning={setTuning} />
        <FretboardCanvas
          tuning={tuning}
          scale={scale}
          chordSet={chordSet}
          setChordSet={setChordSet}
        />
      </div>
      <div className={styles.scales}>
        <ScaleControls scale={scale} setScale={setScale} />
      </div>

    </div>
  );
};

export default FretboardApp;
