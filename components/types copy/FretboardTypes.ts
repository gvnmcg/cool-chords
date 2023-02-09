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
//old
export type ChordType = {
  notes: NoteType[];
  slurs: NoteType[];
};
export type SlursType = NoteType[];

//new
export type ChordArr = {
  notes: number[];
  riff: number[][]
}

export type ChordSequenceType = {
  id: string;
  title: string;
  midiSequence: ChordArr[];
}

export type ChordCollectionType = {
  id: string;
  title: string;
  midiSequence: ChordArr[];
}

export type CollectionPartType = {
  id: string;
  title: string;
  midiSequence: ChordArr[];
}

// Chord UI type
export type NoteMarkerType = {
  str: number;
  fret: number;
};

// export type ChordNoteType = {
//   midiValue: number;
// };
