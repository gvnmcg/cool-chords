// [[[ Weird Constants ]]]
import bbq from "../sequences/BetterBeQuiet.json"
import wave from "../sequences/wave.json"
import fire from "../sequences/firer.json"

export const debug: boolean = !true;
export const sequenceDebug: boolean = !true;
export const chordDebug: boolean = !true;
export const tuningDebug: boolean = !true;
export const fretboardDebug: boolean = !true;
export const fretboardCanvasDebug: boolean = !true;

import { ChordCollectionType, NoteType, TuningType } from "../components/fretboard/types/FretboardTypes";

export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];

export const scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];

export const noteNamesSlashed = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];

export const noteNamesSharps = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const noteNamesFlats = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const noteNames = noteNamesSharps;

export const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];
export const scaleIntervals = [0, 2, 4, 5, 7, 9, 11];
export const chordQualities = ["", "m", "m", "", "", "m", "dim"];

export const standardTuning: number[] = [40, 45, 50, 55, 59, 64];
export const DADFADTuning: number[] = [38, 45, 50, 54, 57, 62];

// Chord Note Set
export const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

const fretArr2NoteSet = (fretArr: number[], tuning: number[]): NoteType[] => {
  return fretArr.map((fret, ix) => {
    return {
      fret: fret,
      str: ix,
      midi: tuning[ix] + fret,
    };
  });
};
const CShapeChord: NoteType[] = fretArr2NoteSet(
  [0, 3, 2, 0, 1, 0],
  standardTuning
);
const GShapeChord: NoteType[] = fretArr2NoteSet(
  [3, 2, 0, 0, 0, 3],
  standardTuning
);
const FShapeChord: NoteType[] = fretArr2NoteSet(
  [1, 3, 3, 2, 1, 1],
  standardTuning
);

// Chord midi note array.

export const getFret = (tuning:TuningType, str:number, noteMidi:number) => noteMidi - tuning[str];

export const initChordArraySequence = [
  {
    notes: [0, 3, 2, 0, 1, 0].map((fret, ix) => standardTuning[ix] + fret),
    riff: [[]],
  },
  {
    notes: [3,2,0,0,0,3].map((fret, ix) => standardTuning[ix] + fret),
    riff: [[]],
  },
  {
    notes: [1,3,3,2,1,1].map((fret, ix) => standardTuning[ix] + fret),
    riff: [[]],
  },
];


export const initChordSequence = [
  {
    notes: CShapeChord,
    slurs: [],
  },
  {
    notes: FShapeChord,
    slurs: [],
  },
  {
    notes: GShapeChord,
    slurs: [],
  },
];

export const altChordSequence = [
  {
    notes: FShapeChord,
    slurs: [],
  },
  {
    notes: CShapeChord,
    slurs: [],
  },
  {
    notes: GShapeChord,
    slurs: [],
  },
];


export const jsonArr:ChordCollectionType[] = [
  { id: "p0", title: "bbq", midiSequence: bbq },
  { id: "p1", title: "wav", midiSequence: wave },
  { id: "p2", title: "fir", midiSequence: fire },
];

export const initChordCollection = 
  { id: "test", title: "None", midiSequence: [] };

export const midi2Name = (midi: number): string => noteNames[midi % 12];
