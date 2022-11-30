// [[[ Weird Constants ]]]

import { FBStateType, NoteType } from "./FretboardTypes";

export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];

export const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];


export const standardTuning: number[] = [16, 23, 31, 38, 45, 52];
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
  tuning: [16, 23, 31, 38, 45, 52],
  scaleKey: 16,
  scale: [0, 2, 4, 5, 7, 9, 11],
  scaleChord: allTrue,
};

export const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };


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


export const initChordSequence = [{
  notes: initChord1,
  slurs: []
},
{
  notes: initChord2,
  slurs: []
}]

export const  midi2Name = (midi:number):string => noteNames[midi % 12];

