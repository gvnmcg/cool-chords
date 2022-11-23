import React from "react";
import FretboardCanvas from "./FretboardCanvas";
// import "./TabApp.css";
// const noteAccidentals = [
//   "C",
//   "C#/Db",
//   "D",
//   "D#/Eb",
//   "E",
//   "F",
//   "F#/Gb",
//   "G",
//   "G#/Ab",
//   "A",
//   "A#/Bb",
//   "B",
// ];

// const notes = ["C", "-", "D", "-", "E", "F", "-", "G", "-", "A", "-", "B"];

// const standardTuning = [16, 23, 31, 38, 45, 52];

// const scaleNotes = [0, 1, 2, 3, 4, 5];

// const initState = {
//   tuning: [16, 23, 31, 38, 45, 52],
//   strs: [0, 1, 2, 3, 4, 5],
//   omit: [true, true, false, true, true, true],
//   songKey: {
//     useKey: true,
//     scale: [0, 2, 4, 5, 7, 9, 11],
//     omited: [true, true, false, true, true, true],
//   },
// };

// const stringState = {
//   tuned: tuningState.tuning[2],
//   str: tuningState.strs[2],
//   omitted: tuningState.omit[2],
// };

// const tuningState = {
//   tuning: [16, 23, 31, 38, 45, 52],
// };
// const songKeyState = {
//   scale: [0, 2, 4, 5, 7, 9, 11],
// };
// const bigState = {
//   tuningState: tuningState,
//   songKeyState: songKeyState,
// };

const standardTuning = [16, 23, 31, 38, 45, 52];
const dadfad = [14, 21, 29, 38, 45, 50];

const allFalse = [false, false, false, false, false, false, false];
const allTrue = [true, true, true, true, true, true, true];

const fbState = {
  tuning: [16, 23, 31, 38, 45, 52],
  scale: allTrue,
  // scale:
};
// const iota = (n) => [...Array(n).keys()];

/**
 * [[[[[[[[[[[[[FretboardApp]]]]]]]]]]]]]]
 * purpose - display an editable representation of the
 *           guitar fretboard.
 *
 * ## Gonna need styling help
 */
const FretboardApp = () => {
  const [state, setState] = React.useState(fbState);

  const setScale = (newScale) => {
    setState({ ...state, scale: newScale });
  };

  const setTuning = (newtuning) => {
    setState({ ...state, tuning: newtuning });
  };

  return (
    <div className="TabApp" style={{ padding: "30px" }}>
      <div style={{ padding: "30px" }}>
        <KeyControls scale={state.scale} setScale={setScale} />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <TuningControls tuning={state.tuning} setTuning={setTuning} />
        <DisplayGuitarStrings tuning={state.tuning} scale={state.scale} />
      </div>
    </div>
  );
};

const KeyControls = ({ scale, setScale }) => {
  const toggleScaleNumber = (scaleNumber, b) => {
    let newScale = scale;
    newScale[scaleNumber] = !newScale[scaleNumber];
    setScale(newScale);
  };

  const toggleChord = (chordNum) => {
    let newScale = [false, false, false, false, false, false, false];
    newScale[chordNum] = true;
    newScale[(chordNum + 2) % 7] = true;
    newScale[(chordNum + 4) % 7] = true;
    setScale(newScale);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {scaleNotes.map((ch, i) => (
        <div key={i}>
          {ch}
          <br />
          {i + 1}
          <input
            type="checkbox"
            checked={scale[i]}
            onChange={(e) => {
              toggleScaleNumber(i);
            }}
          />

          <button
            onClick={() => {
              toggleChord(i);
            }}
          >
            {ch}
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setScale(allTrue);
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          setScale(allFalse);
        }}
      >
        nil
      </button>
    </div>
  );
};

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

/**
 * DisplayGuitarStrings
 *
 * purpose - create tunable string row using state
 *
 * -  func: create row that can be edited. Takes (string number)
 * -  -  func: edit row given a tune direction. Takes (guitar peg turn)
 * -  display buttons
 * -  display representation
 *
 */
// const DisplayGuitarStrings = ({ tuning, scale }) => {
//   return (
//     <div style={{ alignItems: "center", font: "monospaced" }}>
//       {fretMarkers}
//       {tuning.map((t, n) => (
//         <div key={n}>{strString(tuning[n], scale)}</div>
//       ))}
//     </div>
//   );
// };
const DisplayGuitarStrings = ({ tuning, scale }) => {
  return <FretboardCanvas tuning={tuning} scale={scale} />;
};

const notes = ["C", "-", "D", "-", "E", "F", "-", "G", "-", "A", "-", "B"];
// const notes = ["1", "-", "2", "-", "3", "4", "-", "5", "-", "6", "-", "7"];

const scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];
const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];

// const notestring  = "-|-C-|---|-D-|---|-E-|-F-|---|-G-|---|-A-|---|-B-";
// const notestring  = "-|-1-|---|-2-|---|-3-|-4-|---|-5-|---|-6-|---|-7-";

// const blankString = "-|---|---|---|---|---|---|---|---|---|---|---|---";
// const fretMarkers = "-|---|___|___|_3_|___|_5_|___|_7_|___|_9_|___|___|-%-";

/**
 * strString (note, scale)
 *
 * represent string
 */
// const strString = (note, scale) => {
//   ////////
//   //build string rep
//   let rep = "";

//   for (let i = 0; i < 13; i++) {
//     rep += "-|-";

//     let fromOpen = (note + i) % 12;

//     //if scale contains true
//     // then include Note rep
//     // else '-'
//     if (scale[scaleNumbers[fromOpen] - 1]){
//       rep += notes[fromOpen];
//     } else {
//       rep += "-"
//     }
//   }

//   return rep;
// };

export default FretboardApp;
