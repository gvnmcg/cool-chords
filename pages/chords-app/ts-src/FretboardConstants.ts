// [[[ Weird Constants ]]]

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

export const  midi2Name = (midi:number):string => noteNames[midi % 12];