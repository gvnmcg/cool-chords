// [[[ Weird Constants ]]]

export const debug: boolean =  !true;

import { NoteType } from "../utils/FretboardTypes";

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

export const noteNames = noteNamesSharps 

export const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];
export const scaleIntervals = [0, 2, 4, 5, 7, 9, 11];

export const standardTuning: number[] = [40, 45, 50, 55, 59, 64];
export const DADFADTuning: number[] = [38, 45, 50, 54, 57, 62];

export const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

const fretArr2NoteSet = (fretArr: number[], tuning:number[]):NoteType[] => {
  return fretArr.map( (fret, ix) => {
    return {
      fret: fret,
      str: ix,
      midi: tuning[ix] + fret,
    }
  })
  // return tuning.map((value, ix) => {
  //   return {
  //     fret: fretArr[ix],
  //     str: ix,
  //     midi: value + fretArr[ix],
  //   }})
}
const CShapeChord: NoteType[] = fretArr2NoteSet([0,3,2,0,1,0], standardTuning)
const GShapeChord: NoteType[] = fretArr2NoteSet([3,2,0,0,0,3], standardTuning)
const FShapeChord: NoteType[] = fretArr2NoteSet([1,3,3,2,1,1], standardTuning)


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

export const midi2Name = (midi: number): string => noteNames[midi % 12];
