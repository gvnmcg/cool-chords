import React from "react";
import { Tuning } from "./constants/Types";
import { CGDAEG, DADFAD, EADGBe, debugAll, noteNamesSlashed } from "./constants/Constants";
import styles from "../../styles/editor/Tuning.module.css";

const tuningDebug: boolean = debugAll || false;


 interface TuningViewProps {
  tuning: Tuning;
  tuneString: (t: number, n: number) => void;
}

const TuningView = ({
  tuning,
  tuneString,
}: TuningViewProps) => {
  return (
    <div >
      <div className={styles.tuning}>
        {tuning?.map((t: number, n: number) => (
          <div className={styles.peg}
          key={n}>
            <button onClick={() => tuneString(n, 1)}>+</button>
            <span> {noteNamesSlashed[t % 12]} </span>
            <button onClick={() => tuneString(n, -1)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
};


interface TuningUIProps {
  tuning: Tuning;
  setTuning: (t: Tuning) => void;
}

const TuningUI = ({ tuning, setTuning }: TuningUIProps) => {

  const tuneString = (strNum: number, turnDir: number) => {
    setTuning(
      tuning.map((tuned, index) => (index == strNum ? tuned + turnDir : tuned))
    );
    if (tuningDebug) console.log("tuneString", strNum, turnDir);
  };

  const shiftAll = (turnDir: number) => {
    setTuning(tuning.map((t) => t + turnDir));
    if (tuningDebug) console.log("shift all", turnDir);
  };


  return (
    <div className={styles.tuneAll}>
      <button
        onClick={() => {
          //standard tuning
          setTuning(EADGBe);
        }}
      >
        Standard Tuning
      </button>
      <button
        onClick={() => {
          //DADFAD tuning
          setTuning(DADFAD);
        }}
      >
        DADFAD Tuning
      </button>
      <button
        onClick={() => {
          //CGDAEG tuning
          setTuning(CGDAEG);
        }}
      >
        New Standard Tuning
      </button>
      <div>
        <button onClick={() => shiftAll(1)}> +</button>
        <span> all </span>
        <button onClick={() => shiftAll(-1)}> -</button>
      </div>
      <TuningView tuning={tuning} tuneString={tuneString} />
    </div>
  );
};

export default TuningUI;
