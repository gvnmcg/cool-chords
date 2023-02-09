import React from "react";
import { standardTuning, DADFADTuning, noteNames } from "../utils/FretboardConstants";
import styles from "../styles/Tuning.module.css";

/**
 * Tuning Contols
 * purpose - create controls to tune guitar representation
 */
interface TuningViewProps {
  tuning: number[];
  setTuning: (t: number[]) => void;
  onAnyChange: (t: number, n: number) => void;
  shiftAll: (t: number) => void;
}
const TuningView = ({
  tuning,
  setTuning,
  onAnyChange,
  shiftAll,
}: TuningViewProps) => {
  return (
    <div >
      <div className={styles.tuning}>
        {tuning?.map((t: number, n: number) => (
          <div className={styles.peg}
          key={n}>
            <button onClick={() => onAnyChange(n, 1)}>+</button>
            <span> {noteNames[t % 12]} </span>
            <button onClick={() => onAnyChange(n, -1)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuningView;
