import React from "react";


/**
 * Tuning Contols
 * purpose - create controls to tune guitar representation
 */
 type TuningViewProps = { 
    tuning:, setTuning, onAnyChange, shiftAll }
 const TuningView = ({props:{ tuning, setTuning, onAnyChange, shiftAll }}) => {
   
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tuning.map((t, n) => (
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
            setTuning(dadfad);
          }}
        >
          DADFAD Tuning
        </button>
      </div>
    );
  };

  export TuningView