// [[[[[[[Types]]]]]]]

export type NoteType = {
  str: number;
  fret: number;
  midi: number;
};

// Fretboard System
export type TuningType = number[];

export type AccidentalsType = number;
export type ScaleChordType = boolean[];
export type ScaleType = number[]; // ... e.g. scale: [0, 2, 4, 5, 7, 9, 11],

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

// export type ChordNoteType = {
//   midiValue: number;
// };
