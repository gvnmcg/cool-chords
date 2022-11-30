import React from "react";
import { TuningType } from "../FretboardTypes";
import TuningView from "./TuningView";

/**
 * Tuning Controls
 * purpose - create controls to tune guitar representation
 */
 interface TuningControlsProps {
    tuning: TuningType;
    setTuning: (t: TuningType) => void;
  }
  const TuningControls = ({ tuning, setTuning }: TuningControlsProps) => {
    const onAnyChange = (strNum: number, turnDir: number) => {
      let newTuning = tuning;
      newTuning[strNum] = newTuning[strNum] + turnDir;
      setTuning(newTuning);
    };
  
    const shiftAll = (turnDir: number) => {
      setTuning(tuning.map((t) => t + turnDir));
    };
  
    const viewProps = { tuning, setTuning, onAnyChange, shiftAll };
  
    return (
      <TuningView
        tuning={tuning}
        setTuning={setTuning}
        onAnyChange={onAnyChange}
        shiftAll={shiftAll}
      />
    );
  };
  
  export default TuningControls;