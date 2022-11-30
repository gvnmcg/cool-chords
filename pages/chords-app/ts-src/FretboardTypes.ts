// [[[[[[[Types]]]]]]]

export type FBStateType = {
  // Tuning is a array of midi/note values representing the guitar string tuning
  tuning: TuningType;
  // Midi value of initial scale key
  scaleKey: ScaleKeyType;
  // subset of scale visible
  scaleChord: boolean[];
  // notes in the scale, from open.
  scale: number[];
};

export type NoteType = {
  str: number;
  fret: number;
  midi: number;
};

// Fretboard System
export type TuningType = number[];

export type ScaleKeyType = number;
export type ScaleChordType = boolean[];
export type ScaleType = boolean[]; // number [] ... e.g. scale: [0, 2, 4, 5, 7, 9, 11],

// Chord Sequence System
export type ChordType = {
  notes: NoteType[];
  slurs: NoteType[];
};
export type SlursType = NoteType[];
export type ChordSequenceType = ChordType[];

// Chord UI type
export type NoteMarkerType = {
  str: number;
  fret: number;
};

export type ChordNoteType = {
  midiValue: number;
};
