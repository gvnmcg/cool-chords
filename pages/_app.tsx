import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChordArr, ChordCollectionType } from '../components/fretboard/types/FretboardTypes';
import { initChordArraySequence, initChordCollection } from '../utils/FretboardConstants';
import { initSong } from '../components/editor/constants/Constants';

export default function App({ Component, pageProps }: AppProps) {
  const [chordCollection, setChordCollection] = useState<ChordCollectionType>(
    initChordCollection
  ); 

  const [song, setSong] = useState<Song>(initSong); 

  return (
    <Component
      song={song}
      setSong={setSong}
      chordCollection={chordCollection}
      setChordCollection={setChordCollection}
    />
  );
  // return <Component {...pageProps} />
}
