// [[[ Weird Constants ]]]

export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];


export const standardTuning: number[] = [16, 23, 31, 38, 45, 52];
export const DADFADTuning: number[] = [14, 21, 29, 38, 45, 50];

const noteAccidentals = [
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

export const  midi2Name = (midi:number):string => noteAccidentals[midi % 12];