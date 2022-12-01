import React from "react";
import { standardTuning, DADFADTuning } from "../FretboardConstants";

/**
 * Tuning Contols
 * purpose - create controls to tune guitar representation
 */
interface TuningViewProps {
  tuning: number[];
  setTuning: (t: number[]) => void;
  onAnyChange: (t: number, n: number) => void;
  shiftAll: (t: number) => void;
};
const TuningView = ({ tuning, setTuning, onAnyChange, shiftAll }: TuningViewProps) => {
  return (
    <div>
      {tuning?.map((t: number, n: number) => (
        <div key={n}>
          <button onClick={() => onAnyChange(n, 1)}>+</button>
          <span> {t} </span>
          <button onClick={() => onAnyChange(n, -1)}>-</button>
        </div>
      ))}

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

export default TuningView;
