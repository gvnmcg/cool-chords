import React from "react";
import Upload from "./Upload";
import { ChordSequenceType, TuningType } from "../utils/FretboardTypes";
import styles from "../styles/Home.module.css";
import ChordsCanvas from "./ChordsCanvas2";
import Download from "./Download";

interface SequenceControlsProps {
  tuning: TuningType;
  sequenceList: ChordSequenceType[];
  setSequenceList: (list: ChordSequenceType[]) => void;
  chordSequence: ChordSequenceType;
  setChordSequence: (list: ChordSequenceType) => void;
  sequenceIndex: number;
  setSequenceIndex: (n: number) => void;
}

const SequenceControls = ({
  tuning,
  sequenceList,
  setSequenceList,
  chordSequence,
  setChordSequence,
  sequenceIndex,
  setSequenceIndex,
}: SequenceControlsProps) => {
  return (
    <div>
      <Upload setSequenceList={setSequenceList} />
      <Download
        chordSequence={chordSequence}
        sequenceList={sequenceList}
        setSequenceList={setSequenceList}
      />
      <div className={styles.chordSequenceSelectionList}>
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
    </div>
  );
};

export default SequenceControls;
