import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditorApp from '../../components/editor/EditorApp';
import { Song } from '../../components/editor/constants/Types';
import Download from '../../components/editor/files/Download';
import styles from '../../styles/editor/Home.module.css'

interface SongEditorProps {
  song: Song;
  setSong: (seq: Song) => void;
}
  
export default function Home({song, setSong}:SongEditorProps) {

  const saveCurrentSongToLocalStorage = () => {
    localStorage.setItem(
      ""+song.id,
      JSON.stringify(song)
    );
  }

  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <Link href={"/"} className={styles.backButton}>
        Back
      </Link>
      <button
        className={styles.backButton}
        onClick={() => saveCurrentSongToLocalStorage()}
      >
        Save
      </button>
      {/* <div>
        {song.parts.map((part) => (
          <div>
            {part.progression.map((chord) => (
              <div>{JSON.stringify(chord, null, "\n")}</div>
            ))}
          </div>
        ))}
      </div>  */}
      <Download song={song} />
      <EditorApp song={song} setSong={setSong} />
    </div>
  );
}
