import React, { useState, FunctionComponent } from "react";
import { TuningControls } from "./FretboardController";

// [[[ Weird Constants ]]]
const standardTuning: number[] = [16, 23, 31, 38, 45, 52];
const DADFADTuning: number[] = [14, 21, 29, 38, 45, 50];

const allFalse: boolean[] = [false, false, false, false, false, false, false];
const allTrue: boolean[] = [true, true, true, true, true, true, true];

const initFBState: FBState = {
    tuning: [16, 23, 31, 38, 45, 52],
    scaleKey: 16,
    scale: [0, 2, 4, 5, 7, 9, 11],
    scaleChord: allTrue,
  };
  
// [[[[[[[Types]]]]]]]

type FBStateType = {
  // Tuning is a array of midi/note values representing the guitar string tuning
  tuning: TuningType;
  // Midi value of initial scale key
  scaleKey: ScaleKeyType;
  // subset of scale visible
  scaleChord: boolean[];
  // notes in the scale, from open.
  scale: number[];
};

type NoteType = {
    str: number;
    fret: number;
    midiValue: number;
  };
  
// Fretboard System
type TuningType = number[];
type ScaleKeyType = number;
type ScaleChordType = boolean[];
type ScaleType = number[];


// Chord Sequence System
type ChordType = {
  notes: NoteType[];
  slurs: NoteType[];
};
type SlursType = NoteType[];
type ChordSequenceType = ChordType[];

// Chord UI type
type NoteMarkerType = {
  str: number;
  fret: number;
};

type ChordNoteType = {
  midiValue: number;
};

/**
 * 
 */
const FretboardApp = (): React.FunctionComponent => {
  // const [state, setState] = useState(initFBState);

  // Fretboard System
  const [tuning, setTuning] = useState<TuningType>([]);
  const [scale, setScale] = useState<ScaleType>([]);
  const [scaleKey, setScaleKey] = useState<ScaleKeyType>([]);
  const [scaleChord, setScaleChord] = useState<ScaleChordType>([]);

  // Chord System
  const [chordSequence, setChordSequence] = useState<ChordSequenceType>([]);
  const [chordNotes, setChordNotes] = useState<ChordType>([]);
  const [slurs, setSlurs] = useState<SlursType>([]);
  
  return (
    <div>
        <div className="chord-sequence-panel">
            
        </div>
        <div className="scale-panel">

        </div>
        <div className="fretboard-panel">
            <TuningControls props={tuning, setTuning}/>
        </div>
    </div>
  )
};
