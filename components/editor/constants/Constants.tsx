// [[[[[[[Types]]]]]]]

import {
  ChordShape,
  Tuning,
  Chord,
  User,
  SongPart,
  Sequence,
  Song,
} from "./Types";

export const debugAll = false;

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

export const chordQualities = ["", "m", "m", "", "", "m", "dim"];


// Fretboard System

/**
 * The Tuning is the base midi values to which the chords values are added.
 * The length of the tuning is important because,
 */
//  type Tuning = number[];
export const EADGBe: Tuning = [40, 45, 50, 55, 59, 64];
export const DADFAD: Tuning = [38, 45, 50, 54, 57, 62];
export const BassEADG: Tuning = [28, 33, 38, 43];
export const UkeGCEA: Tuning = [98, 72, 76, 81];

// Scale Marker System
//  type Intervals = number[]; // ... e.g. scale: [0, 2, 4, 5, 7, 9, 11],
export const scaleIntervals = [0, 2, 4, 5, 7, 9, 11];

//   type ScaleChordSubset = boolean[];
export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];

//  export type ChordShape = number[]
const CChordShape: ChordShape = [0, 3, 2, 0, 1, 0];
const GChordShape: ChordShape = [3, 2, 0, 0, 0, 3];
const FChordShape: ChordShape = [1, 3, 3, 2, 1, 1];

export const getFret = (tuning: Tuning, str: number, noteMidi: number) =>
  noteMidi - tuning[str];

//Sequence for playback
export const initSequence = [
  [2, 3, 4],
  [1, 2, 3],
];

const toMidi = (tuning: number[], fretArr: number[]): number[] =>
  fretArr.map((fret, ix) => tuning[ix] + fret);

export const CChord: Chord = {
  name: "C",
  shape: toMidi(EADGBe, CChordShape),
  riff: [
    toMidi(EADGBe, [0, 3, 0, 0, 0, 0]),
    toMidi(EADGBe, [0, 0, 2, 0, 0, 0]),
    toMidi(EADGBe, [0, 0, 0, 0, 1, 0]),
  ],
  sequence:initSequence
};

// export type User = {
//   username: string;
//   email: string | undefined;
// };

// export const initChordProgression: ChordProgression = {
//   id: 0,
//   name: "init string",
//   chords: [CChord, CChord, CChord],
// };

export const initUser: User = {
  username: "Gavin",
  email: "gvnmcg517@gmail.com",
};

export const initSongPart: SongPart = {
  id: 0,
  title: "init string",
  progression: [CChord, CChord, CChord],
};

export const initSong: Song = {
  id: 0,
  title: "init string",
  // progression: ChordProgression,
  parts: [initSongPart, initSongPart, initSongPart],
  author: initUser,
};

// export const initSequence: Sequence = {
//   strumSequence: initSequence,
//   pluckSequence: initSequence,
// };

// Chord UI type
//  export const NoteMarker:NoteMarker = {
//    str: 0,
//    fret: 0,
//  };
