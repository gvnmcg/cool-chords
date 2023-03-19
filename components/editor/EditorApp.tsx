import React, { useEffect, useState } from "react";
import useSound from "react-guitar-sound";

import { CChord, EADGBe, allTrue, initSongPart, scaleIntervals } from "./constants/Constants";
import { Chord, ScaleChord, Song, Tuning, ScaleIntervals, SongPart } from "./constants/Types";

import FretboardUI from "./fretboard/FretboardUI";
import ScaleUI from "./fretboard/ScaleUI";
import TuningUI from "./fretboard/TuningUI";
import SongMapUI from "./song-parts/SongMapUI";
import PartMapUI from "./part-chords/PartMapUI";

import styles from "styles/editor/Editor.module.css";

interface SongEditorProps {
  song: Song;
  setSong: (seq: Song) => void;
}

/**
 *
 */
const SongEditor = ({song, setSong}:SongEditorProps) => {
 
  const [soundOn, setSound] = useState<boolean>(false);
  const [songPart, setSongPart] = useState<SongPart>(initSongPart); 
  const [partIndex, setPartIndex] = useState<number>(0);
  
  // Fretboard System
  const [tuning, setTuning] = useState<Tuning>(EADGBe);
  const [chord, setChord] = useState<Chord>(CChord);
  const [chordIndex, setChordIndex] = useState<number>(0);
  // const chord = song.parts

  //Scale System
  const [keyTonic, setKeyTonic] = useState<number>(0);
  const [scale, setScale] = useState<ScaleIntervals>(scaleIntervals); // [0, 2, 4, 5, 7, 9, 11];
  const [scaleChord, setScaleChord] = useState<ScaleChord>(allTrue);

  const getFretting = (chordShape:number[], currentTuning:number[]) => {
    return chordShape.map((note:number, ix:number)=> note - currentTuning[ix])
  }
  // const { play, strum } = useSound({ fretting: [0,0,0,0,0,0], tuning: chord.shape })
  // const guitar_sound = withSoundFont('guitar_fret_noise')
  const { play } = useSound({
    // instrument: guitar_sound,
    fretting: getFretting(chord.shape, tuning),
    tuning: tuning,
    muted: !soundOn,
  });

  useEffect(() => {
    // const context = new AudioContext();
    // if (soundOn) {
    //   context.resume().then(() => {});
    // } else {
    //   context.close().then(()=>{})
    // }
    // console.log("EditorApp use effect: soundOn :", soundOn)

    setSongPart({
      ...songPart,
      progression: songPart.progression.map((currChord: Chord, ix: number) =>
        chordIndex == ix ? chord : currChord
      ),
    });

    setSong({
      ...song,
      parts: song.parts.map((currPart: SongPart, ix: number) =>
        partIndex == ix ? songPart : currPart
      ),
    });

  }, [chord]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <SongMapUI
          tuning={tuning}
          song={song}
          setSong={setSong}
          songPart={songPart}
          setSongPart={setSongPart}
          partIndex={partIndex}
          setPartIndex={setPartIndex}
          chord={chord}
          setChord={setChord}
          setChordIndex={setChordIndex}
        />
        <PartMapUI
          tuning={tuning}
          songPart={songPart}
          setSongPart={setSongPart}
          chordIndex={chordIndex}
          setChordIndex={setChordIndex}
          chord={chord}
          setChord={setChord}
        />
        <div className={styles.fretboardEditor}>
          <TuningUI tuning={tuning} setTuning={setTuning} />
          <div>
            <span>Sound:</span>
            <input
              type="checkbox"
              onChange={(e) => {
                setSound(e.target.checked)
                if (!soundOn) context.close().then(()=>{})
              }}
            />
          </div>
          <FretboardUI
            play={play}
            tuning={tuning}
            keyTonic={keyTonic}
            scale={scale}
            scaleChord={scaleChord}
            chord={chord}
            setChord={setChord}
            
          />
        </div>
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
