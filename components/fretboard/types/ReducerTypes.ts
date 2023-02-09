type Chord = {
    name: string;
    frets: number[];
    fingers: number[];
  };
  
  type Progression = Chord[];
  
  type Song = {
    title: string;
    progression: Progression;
  };
  
  type AppState = {
    currentSong: Song;
    allSongs: Song[];
  };
  
  type AddChordAction = {
    type: 'ADD_CHORD';
    chord: Chord;
  };
  
  type RemoveChordAction = {
    type: 'REMOVE_CHORD';
    chordIndex: number;
  };
  
  type ChangeChordAction = {
    type: 'CHANGE_CHORD';
    chordIndex: number;
    chord: Chord;
  };
  
  type ChangeSongAction = {
    type: 'CHANGE_SONG';
    songIndex: number;
  };
  
  type Action =
    | AddChordAction
    | RemoveChordAction
    | ChangeChordAction
    | ChangeSongAction;