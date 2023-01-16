import React, { useState } from "react";
import TuningControls from "../../components/Tuning";
import ScaleControls from "../../components/Scale";
import FretboardCanvas from "../../components/FretboardCanvas";
import SequenceControls from "../../components/Sequence";
import {
  ChordSequenceType,
  ChordType,
  NoteType,
  ScaleChordType,
  AccidentalsType,
  ScaleType,
  SlursType,
  TuningType,
  ChordArr,
} from "../../utils/FretboardTypes";
import {
  allTrue,
  altChordSequence,
  initChordSequence,
  standardTuning,
  scaleIntervals,
  initChordArraySequence
} from "../../utils/FretboardConstants";
import ChordControls from "../../components/Chords";
import styles from "../../styles/Home.module.css";
import ChordArrayControls from "../../components/Chords2";
import FretboardCanvas2 from "../../components/FretboardCanvas2";

/**
 *
 */
const FretboardApp = () => {
  // const [state, setState] = useState(initFBState);

  // Sequence System
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [sequenceList, setSequenceList] = useState<ChordSequenceType[]>([
    initChordArraySequence,
    initChordArraySequence,
  ]);

  // Chord System
  const [chordSequence, setChordSequence] =
    useState<ChordType[]>(initChordSequence);

 const [chordArrSequence, setChordArrSequence] =
    useState<ChordArr[]>(initChordArraySequence);


  const [chordSet, setChordSet] = useState<NoteType[]>(
    initChordSequence[0].notes
  );
  const [chordArray, setChordArray] = useState<number[]>(
    [0,3,2,0,1,0].map((fret,ix)=> standardTuning[ix] + fret)
  );
  const [slurs, setSlurs] = useState<SlursType>([]);

  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>(standardTuning);
  const [scale, setScale] = useState<ScaleType>(scaleIntervals); // [0, 2, 4, 5, 7, 9, 11];
  const [accidentals, setAccidentals] = useState<AccidentalsType>(0);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>(allTrue);
  const [keyNote, setKeyNote] = useState<number>(0);

  return (
    <div className={styles.main}>
      {/* <SequenceControls
        tuning={tuning}
        sequenceList={sequenceList}
        setSequenceList={setSequenceList}
        chordSequence={chordSequence}
        setChordSequence={setChordSequence}
        sequenceIndex={sequenceIndex}
        setSequenceIndex={setSequenceIndex}
      /> */}
      <div className={styles.chordSequenceEditor}>
        <div className={styles.chordSequence}>
          {/* <ChordControls
            tuning={tuning}
            chordSequence={chordSequence}
            setChordSequence={setChordSequence}
            chordSet={chordSet}
            setChordSet={setChordSet}
          /> */}
          <ChordArrayControls 
           tuning={tuning}
           chordSequence={chordArrSequence}
           setChordSequence={setChordArrSequence}
           chordSet={chordArray}
           setChordSet={setChordArray}
          />

          <div className={styles.fretboard}>
            {/* <FretboardCanvas
              tuning={tuning}
              setTuning={setTuning}
              scale={scale}
              scaleChord={scaleChord}
              chordSet={chordSet}
              setChordSet={setChordSet}
            />  */}
            <FretboardCanvas2
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
