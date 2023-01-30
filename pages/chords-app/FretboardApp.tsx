import React, { useEffect, useState, useMemo } from "react";
import TuningControls from "../../components/Tuning";
import ScaleControls from "../../components/Scale";
import SequenceControls from "../../components/Sequence";
import styles from "../../styles/Home.module.css";
import ChordArrayControls from "../../components/ChordArrays";
import FretboardCanvas from "../../components/FretboardCanvas";
import {
  ScaleChordType,
  AccidentalsType,
  ScaleType,
  TuningType,
  ChordArr,
} from "../../components/types/FretboardTypes";
import {
  allTrue,
  standardTuning,
  scaleIntervals,
  initChordArraySequence,
} from "../../utils/FretboardConstants";
import useSound from "react-guitar-sound";


/**
 *
 */
const FretboardApp = () => {
  // Sequence System
  const [chordArrSequence, setChordArrSequence] = useState<ChordArr[]>(
    initChordArraySequence
  );

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

  
  // const { play, strum } = useSound({ fretting: chordArray, tuning: tuning })
  const { play, strum } = useSound({ fretting: chordArray, tuning: tuning })

  useEffect(() => {
    // return <Guitar strings={strings} onPlay={play} />
    const context = new AudioContext();
    console.log(context.state);

    context.resume().then(() => {
      // source.start(0);
      // play(2);
    });

    // play(2);
  });
      
  return (
    <div className={styles.main}>

      <div className={styles.chordSequenceEditor}>
      <SequenceControls
        tuning={tuning}
        chordSequence={chordArrSequence}
        setChordSequence={setChordArrSequence}
      />
        <div className={styles.chordSequence}>
          <ChordArrayControls
            tuning={tuning}
            chordSequence={chordArrSequence}
            setChordSequence={setChordArrSequence}
            chordSet={chordArray}
            setChordSet={setChordArray}
          />
          <div className={styles.fretboard}>
            <FretboardCanvas
              tuning={tuning}
              keyNote={keyNote}
              setTuning={setTuning}
              scale={scale}
              scaleChord={scaleChord}
              chordSet={chordArray}
              setChordSet={setChordArray}
            />
            <button onClick={()=>strum()}>play</button>
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
