import React, { useState } from "react";
import TuningControls from "./components/Tuning";
import ScaleControls from "./components/Scale";
import FretboardCanvas from "./FretboardCanvas";
import {
  ChordSequenceType,
  ChordType,
  FBStateType,
  ScaleChordType,
  ScaleKeyType,
  ScaleType,
  SlursType,
  TuningType,
} from "./FretboardTypes";
import { allTrue, initChordNote, initChordSequence, openChord, standardTuning } from "./FretboardConstants";
import ChordControls from "./components/Chords";

/**
 *
 */
const FretboardApp = () => {
  // const [state, setState] = useState(initFBState);

  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>(standardTuning);
  const [scale, setScale] = useState<ScaleType>(allTrue);
  const [scaleKey, setScaleKey] = useState<ScaleKeyType>([]);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>([]);

  // Chord System
  const [chordSequence, setChordSequence] = useState<ChordType[]>(initChordSequence);
  const [chordNotes, setChordNotes] = useState<ChordType>([]);
  const [chordSet, setChordSet] = useState<NoteType[]>(openChord);
  const [slurs, setSlurs] = useState<SlursType>([]);

  return (
    <div>
      <div className="chord-sequence-panel">
        <ChordControls 
          tuning={tuning}
          chordSequence={chordSequence}
          setChordSequence={setChordSequence}
          setScaleChord={setScaleChord}
          chordSet={chordSet}
          setChordSet={setChordSet}
          slurs={slurs}
        />
      </div>
      <div className="scale-panel">
        <ScaleControls scale={scale} setScale={setScale}/>
      </div>
      <div className="fretboard-panel">
        <TuningControls tuning={tuning} setTuning={setTuning} />
        <FretboardCanvas 
          tuning={tuning} 
          scale={scale}
          chordSet={chordSet} 
          setChordSet={setChordSet}
        />
      </div>
    </div>
  );
};

export default FretboardApp;
