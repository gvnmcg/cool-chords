// [[[[[[[Types]]]]]]]


// Fretboard System

/**
 * The Tuning is the base midi values to which the chords values are added.
 * The length of the tuning is important because, 
 */
export type Tuning = number[];

// Scale Marker System
export type Intervals = number[]; // ... e.g. scale: [0, 2, 4, 5, 7, 9, 11],
export type Accidentals = number;
export type ScaleChordSubset = boolean[];


export type ChordShape = number[]

export type Chord = {
  name: string;
  shape: ChordShape;
  riff: ChordShape[]
}
 
export type User = {
  username: string;
  email: string | undefined;
};

 export type Song = {
   id: number;
   title: string;
   // progression: ChordProgression;
   parts: SongPart[];
   author: User | undefined;
 };

export type SongPart = {
  id: number;
  title: string;
  progression: ChordProgression;
}

export type ChordProgression = {
  id: number;
  name: string;
  chords: Chord[];
}


export type ProgressionSequence = {
  strumSequence: number[];
  pluckSequence: ChordShape[];
}



// Chord UI type
export type NoteMarker = {
  str: number;
  fret: number;
};

// export type ChordNoteType = {
//   midiValue: number;
// };
