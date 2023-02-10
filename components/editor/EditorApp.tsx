import React, { useEffect, useState, useMemo } from "react";
import useSound from "react-guitar-sound";

import SongUI from "./SongUI";
import FretboardUI from "./FretboardUI";
import ScaleUI from "./ScaleUI";
import { CChord, EADGBe, allTrue, initSongPart, scaleIntervals } from "./constants/Constants";
import { Chord, ScaleChord, Song, Tuning, ScaleIntervals, SongPart } from "./constants/Types";
import styles from "../../styles/Home.module.css";
import TuningUI from "./TuningUI";

interface SongEditorProps {
  song: Song;
  setSong: (seq: Song) => void;
}

/**
 *
 */
const SongEditor = ({song, setSong}:SongEditorProps) => {
 
  const [songPart, setSongPart] = useState<SongPart>(initSongPart); 

  // Fretboard System
  const [tuning, setTuning] = useState<Tuning>(EADGBe);
  const [chord, setChord] = useState<Chord>(CChord);

  //Scale System
  const [keyTonic, setKeyTonic] = useState<number>(0);
  const [scale, setScale] = useState<ScaleIntervals>(scaleIntervals); // [0, 2, 4, 5, 7, 9, 11];
  const [scaleChord, setScaleChord] = useState<ScaleChord>(allTrue);

  const { play, strum } = useSound({ fretting: chord.shape, tuning: tuning })

  useEffect(() => {
    const context = new AudioContext();
    context.resume().then(() => {});
  });

  return (
    <div className={styles.main}>
      <div className={styles.chordSequenceEditor}>
        <SongUI
          tuning={tuning}
          song={song}
          setSong={setSong}
          songPart={songPart}
          setSongPart={setSongPart}
          chord={chord}
          setChord={setChord}
        />
        <FretboardUI
          play={play}
          tuning={tuning}
          keyTonic={keyTonic}
          scale={scale}
          scaleChord={scaleChord}
          chord={chord}
          setChord={setChord}
        />
        <TuningUI tuning={tuning} setTuning={setTuning} />
        <ScaleUI
          keyTonic={keyTonic}
          setKeyTonic={setKeyTonic}
          scale={scale}
          setScale={setScale}
          scaleChord={scaleChord}
          setScaleChord={setScaleChord}
        />
      </div>
    </div>
  );
};

export default SongEditor;
