// [[[ Weird Constants ]]]

export const debug: boolean =  false;

import { FBStateType, NoteType } from "./FretboardTypes";

export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];

export const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];

export const standardTuning: number[] = [40, 45, 50, 55, 59, 64].reverse();
export const DADFADTuning: number[] = [14, 21, 29, 38, 45, 50];

export const scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];

export const noteNames = [
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

const initFBState: FBStateType = {
  tuning: [40, 45, 50, 55, 59, 64],
  scaleKey: 16,
  scale: [0, 2, 4, 5, 7, 9, 11],
  scaleChord: allTrue,
};

export const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

const CShapeChord: NoteType[] = [
  {str: 5, fret: 0, midi: 40},
  {str: 4, fret: 3, midi: 48},
  {str: 3, fret: 2, midi: 52},
  {str: 2, fret: 0, midi: 55},
  {str: 1, fret: 1, midi: 60},
  {str: 0, fret: 0, midi: 64},
];

const GShapeChord: NoteType[] = [
  { str: 5, fret: 3, midi: 55 },
  { str: 4, fret: 2, midi: 47 },
  { str: 3, fret: 0, midi: 38 },
  { str: 2, fret: 0, midi: 31 },
  { str: 1, fret: 0, midi: 23 },
  { str: 0, fret: 3, midi: 19 },
];

const FShapeChord: NoteType[] = [
  { str: 5, fret: 1, midi: 53 },
  { str: 4, fret: 3, midi: 48 },
  { str: 3, fret: 3, midi: 41 },
  { str: 2, fret: 2, midi: 33 },
  { str: 1, fret: 1, midi: 24 },
  { str: 0, fret: 1, midi: 17 },
];

const initChord1: NoteType[] = [
  { fret: 0, str: 0, midi: 0 },
  { fret: 0, str: 1, midi: 0 },
  { fret: 0, str: 2, midi: 0 },
];
const initChord2: NoteType[] = [
  { fret: 1, str: 0, midi: 0 },
  { fret: 1, str: 1, midi: 0 },
  { fret: 1, str: 2, midi: 0 },
];

export const openChord: NoteType[] = [
  { fret: 0, str: 0, midi: 0 },
  { fret: 0, str: 1, midi: 0 },
  { fret: 0, str: 2, midi: 0 },
  { fret: 0, str: 3, midi: 0 },
  { fret: 0, str: 4, midi: 0 },
  { fret: 0, str: 5, midi: 0 },
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

export const midi2Name = (midi: number): string => noteNames[midi % 12];
