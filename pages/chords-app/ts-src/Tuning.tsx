


// [[[model]]]

// type
// Fretboard System
type TuningType = number[];
type ScaleKeyType = number;
type ScaleChordType = boolean[];
type ScaleType = number[];

// [[[controller]]]

// fn types
// hooks


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

// [[[view]]]

//sytle sheet
//flex


/**
 * Tuning view
 * - display state
 * - offer response
 */
 type TuningViewProps = { 
    tuning: TuningType, 
    setTuning: (t:TuningType) => void, 
    onAnyChange: ()=>void, 
    shiftAll:(i:number)=>void
}
 const TuningView = ({ tuning, setTuning, onAnyChange, shiftAll }:TuningViewProps) => {
   
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tuning.map((tuneValue, n) => (
          <div key={n}>
            <button onClick={() => onAnyChange(n, 1)}>+</button>
            <span> {tuneValue} </span>
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

        <input className="tuning-string">

        </input>
      </div>
    );
  };
