import React from "react";
import TuningView from "./FretboardView"

/**
 * Tuning Contols
 * purpose - create controls to tune guitar representation
 */
 const TuningControls = ({ tuning, setTuning }) => {
    const onAnyChange = (strNum, turnDir) => {
      let newTuning = tuning;
      newTuning[strNum] = newTuning[strNum] + turnDir;
      setTuning(newTuning);
    };
  
    const shiftAll = (turnDir) => {
      setTuning(tuning.map((t) => t + turnDir));
    };
  
    return (
      <TuningView props={{ tuning, setTuning, onAnyChange, shiftAll }}/>
    );
  };

  export {TuningControls}