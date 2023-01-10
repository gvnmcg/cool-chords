import React from "react";
import { debug } from "../pages/chords-app/FretboardConstants";
import { TuningType } from "../utils/FretboardTypes";
import TuningView from "./TuningView";

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
    <TuningView
      tuning={tuning}
      setTuning={setTuning}
      onAnyChange={onAnyChange}
      shiftAll={shiftAll}
    />
  );
};

export default TuningControls;
