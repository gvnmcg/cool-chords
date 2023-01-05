import React, { useState } from "react";
import TuningControls from "./components/Tuning";
import ScaleControls from "./components/Scale";
import FretboardCanvas from "./FretboardCanvas";
import {
  ChordSequenceType,
  ChordType,
  NoteType,
  ScaleChordType,
  ScaleKeyType,
  ScaleType,
  SlursType,
  TuningType,
} from "./FretboardTypes";
import {
  allTrue,
  altChordSequence,
  initChordSequence,
  standardTuning,
} from "./FretboardConstants";
import ChordControls from "./components/Chords";
import styles from "../../../styles/Home.module.css";
import ChordsCanvas from "./components/ChordsCanvas";
import {Upload} from "./utils/exporter"

/**
 *
 */
const FretboardApp = () => {
  // const [state, setState] = useState(initFBState);

  // Sequence System
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [sequenceList, setSequenceList] = useState<ChordSequenceType[]>([
    initChordSequence,
    altChordSequence,
  ]);

  // Chord System
  const [chordSequence, setChordSequence] =
    useState<ChordType[]>(initChordSequence);
  const [chordSet, setChordSet] = useState<NoteType[]>(
    initChordSequence[0].notes
  );
  const [slurs, setSlurs] = useState<SlursType>([]);

  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>(standardTuning);
  const [scale, setScale] = useState<ScaleType>(allTrue);
  const [scaleKey, setScaleKey] = useState<ScaleKeyType>(0);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>(allTrue);

  return (
    <div className={styles.main}>
      <div className={styles.chordSequenceSelectionList}>
        <button
          onClick={() => setSequenceList(sequenceList.concat(chordSequence))}
        >
          save sequence
        </button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(sequenceList)
          )}`}
          download="filename.json"
        >
          {`Download Json`}
        </a>
        <Upload setSeq={setSequenceList} />
        {sequenceList.map((seq: ChordSequenceType, seqIx: number) => (
          <div
            key={seqIx}
            style={
              sequenceIndex == seqIx
                ? { backgroundColor: "#BADA55" }
                : { backgroundColor: "#000000" }
            }
            className={styles.chordSequenceSelection}
            onClick={() => {
              setSequenceIndex(seqIx);
              setChordSequence(sequenceList[seqIx]);
            }}
          >
            {seq.map((chord, chordIx) => (
              <ChordsCanvas
                chordSet={chord.notes}
                tuning={tuning}
                key={chordIx}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.chordSequenceEditor}>
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
          <ScaleControls
            scale={scale}
            setScale={setScale}
            scaleKey={scaleKey}
            setScaleKey={setScaleKey}
          />
        </div>
      </div>
    </div>
  );
};

export default FretboardApp;
