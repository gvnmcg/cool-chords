import React from "react";
import { Upload } from "../utils/exporter";
import { ChordSequenceType, TuningType } from "../FretboardTypes";
import styles from "../../../../styles/Home.module.css";
import ChordsCanvas from "./ChordsCanvas";

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
      <div>
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
      </div>

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
