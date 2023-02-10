import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChordCollectionType } from '../components/fretboard/types/FretboardTypes';
import { initChordCollection } from '../utils/FretboardConstants';
import { initSong } from '../components/editor/constants/Constants';
import { Song } from '../components/editor/constants/Types';

export default function App({ Component, pageProps }: AppProps) {
  
  const [song, setSong] = useState<Song>(initSong); 
  const [chordCollection, setChordCollection] = useState<ChordCollectionType>(
    initChordCollection
  ); 


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
