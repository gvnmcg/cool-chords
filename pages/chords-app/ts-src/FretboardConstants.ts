// [[[ Weird Constants ]]]

export const debug: boolean =  !true;

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

const fretArr2NoteSet = (fretArr: number[], tuning:number[]):NoteType[] => {
  fretArr = fretArr.reverse()
  return tuning.map((value, ix) => {
    return {
      fret: fretArr[ix],
      str: ix,
      midi: value + fretArr[ix],
    }}).reverse()
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


// const chordSetFretstoString = (chord:NoteType[]) => {
//   return chord.sort((noteA, noteB)=> noteB.str - noteA.str)
//               .map((note) => note.fret.toString )
//               .
// }

export const midi2Name = (midi: number): string => noteNames[midi % 12];
