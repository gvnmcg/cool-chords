// [[[[[[[Types]]]]]]]

import { ChordShape, Tuning, Chord, User, ChordProgression, SongPart } from "./FretboardTypes";


// Fretboard System

/**
 * The Tuning is the base midi values to which the chords values are added.
 * The length of the tuning is important because, 
 */
//  type Tuning = number[];
 export const EADGBe: Tuning = [40, 45, 50, 55, 59, 64];
 export const DADFAD: Tuning = [38, 45, 50, 54, 57, 62];
 export const BassEADG: Tuning = [28, 33, 38, 43];
 export const UkeGCEA: Tuning = [98, 72, 76,81];

 // Scale Marker System
//  type Intervals = number[]; // ... e.g. scale: [0, 2, 4, 5, 7, 9, 11],
 export const scaleIntervals = [0, 2, 4, 5, 7, 9, 11];

 //   type ScaleChordSubset = boolean[];
export const allFalse = [false, false, false, false, false, false, false];
export const allTrue = [true, true, true, true, true, true, true];

//  export type ChordShape = number[]
const CChordShape: ChordShape = [0, 3, 2, 0, 1, 0];
const GChordShape: ChordShape =[3, 2, 0, 0, 0, 3];
const FChordShape: ChordShape =[1, 3, 3, 2, 1, 1];

//  export type Chord = {
//    notes: ChordShape;
//    riff: ChordShape[]
//  }
export const CChord: Chord = {
    name: "C",
    shape: CChordShape,
    riff:[
       [0, 3, 0, 0, 0, 0],
       [0, 0, 2, 0, 0, 0],
       [0, 0, 0, 0, 1, 0],
   ];
};

const fretToMidi = (fretArr: number[], tuning: number[]): number[] => 
 fretArr.map((fret, ix) => tuning[ix] + fret);
 
// export type User = {
//   username: string;
//   email: string | undefined;
// };


export const initChordProgression:ChordProgression = {
    id: 0,
    name: "init string",
    chords: [CChord,CChord,CChord],
  }
 

export const initUser:User = {
    username:"Gavin",
    email:"gvnmcg517@gmail.com"
}

 export const initSongPart:SongPart = {
   id: 0,
   title: "init string",
   progression: initChordProgression,
 }
 
 export const initSong:Song = {
   id: 0,
   title: "init string",
   // progression: ChordProgression,
   parts: [initSongPart, initSongPart, initSongPart],
   author: initUser ,
 }

 
 //Sequence for playback
 export const initSequence = [[2,3,4], [1,2,3]];
 export const ProgressionSequence = {
   strumSequence: initSequence,
   pluckSequence: initSequence,
 }
 
 
 
 // Chord UI type
 export const NoteMarker = {
   str: 0,
   fret: 0,
 };
 