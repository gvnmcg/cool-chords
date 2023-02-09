import React, { useEffect, useState, useMemo } from "react";
import TuningControls from "../../components/Tuning";
import ScaleControls from "../../components/Scale";
import SequenceControls from "../../components/Sequence";
import styles from "../../styles/Home.module.css";
import FretboardCanvas from "../../components/FretboardCanvas";
import {
  ScaleChordType,
  AccidentalsType,
  ScaleType,
  TuningType,
  ChordArr,
  ChordCollectionType,
} from "../../components/types/FretboardTypes";
import {
  allTrue,
  standardTuning,
  scaleIntervals,
  getFret,
} from "../../utils/FretboardConstants";

import useSound from "react-guitar-sound";

interface FretboardAppProps {
  chordCollection: ChordCollectionType;
  setChordCollection: (co:ChordCollectionType) => void;
}

/**
 *
 */
const FretboardApp = ({chordCollection, setChordCollection}:FretboardAppProps) => {
 
  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>(standardTuning);
  const [chordArray, setChordArray] = useState<number[]>(
    [0, 3, 2, 0, 1, 0].map((fret, ix) => standardTuning[ix] + fret)
  );

  //Scale System
  const [scale, setScale] = useState<ScaleType>(scaleIntervals); // [0, 2, 4, 5, 7, 9, 11];
  const [accidentals, setAccidentals] = useState<AccidentalsType>(0);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>(allTrue);
  const [keyNote, setKeyNote] = useState<number>(0);


    const setChordArrSequence = (chordArrSequence:ChordArr[]) => {
      setChordCollection({...chordCollection, midiSequence:chordArrSequence})
    }


  const { play, strum } = useSound({ fretting: chordArray.map((n,i)=>getFret(tuning,i,n)), tuning: tuning })

  useEffect(() => {
    const context = new AudioContext();
    context.resume().then(() => {});
  });

  return (
    <div className={styles.main}>
      <div className={styles.chordSequenceEditor}>
        {/* <button >Save</button> */}
        <div className={styles.chordSequence}>
          <SequenceControls
            tuning={tuning}
            chordSequence={chordCollection.midiSequence}
            setChordSequence={setChordArrSequence}
            chordSet={chordArray}
            setChordSet={setChordArray}
          />
          <div className={styles.fretboard}>
            <FretboardCanvas
              play={play}
              tuning={tuning}
              keyNote={keyNote}
              setTuning={setTuning}
              scale={scale}
              scaleChord={scaleChord}
              chordSet={chordArray}
              setChordSet={setChordArray}
            />
            <TuningControls tuning={tuning} setTuning={setTuning} />
          </div>
        </div>
        <div className={styles.scales}>
          <ScaleControls
            keyNote={keyNote}
            setKeyNote={setKeyNote}
            scale={scale}
            setScale={setScale}
            scaleChord={scaleChord}
            setScaleChord={setScaleChord}
            accidentals={accidentals}
            setAccidentals={setAccidentals}
          />
        </div>
      </div>
    </div>
  );
};

export default FretboardApp;
