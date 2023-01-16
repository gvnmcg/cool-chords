import React from "react";
import { debug, standardTuning, DADFADTuning } from "../utils/FretboardConstants";
import { TuningType } from "../utils/FretboardTypes";
import TuningView from "./TuningView";
import styles from "../styles/Tuning.module.css";

/**
 * Tuning Controls
 * purpose - create controls to tune guitar representation
 */
interface TuningControlsProps {
  tuning: TuningType;
  setTuning: (t: TuningType) => void;
}

const tuningDebug: boolean = debug || false;

const TuningControls = ({ tuning, setTuning }: TuningControlsProps) => {
  const onAnyChange = (strNum: number, turnDir: number) => {
    setTuning(
      tuning.map((tuned, index) => (index == strNum ? tuned + turnDir : tuned))
    );
    if (tuningDebug) console.log("onAnyChange", strNum, turnDir);
  };

  const shiftAll = (turnDir: number) => {
    setTuning(tuning.map((t) => t + turnDir));
    if (tuningDebug) console.log("shift all", turnDir);
  };

  // const viewProps = { tuning, setTuning, onAnyChange, shiftAll };

  return (
    <div className={styles.tuneAll}>
      
     <TuningView
        tuning={tuning}
        setTuning={setTuning}
        onAnyChange={onAnyChange}
        shiftAll={shiftAll}
      />
      <div>
        <button onClick={() => shiftAll(1)}> +</button>
        <span> all </span>
        <button onClick={() => shiftAll(-1)}> -</button>
      </div>

      <button
        onClick={() => {
          //standard tuning
          setTuning(standardTuning);
        }}
      >
        Standard Tuning
      </button>

      <button
        onClick={() => {
          //DADFAD tuning
          setTuning(DADFADTuning);
        }}
      >
        DADFAD Tuning
      </button>
     
    </div>
  );
};

export default TuningControls;
