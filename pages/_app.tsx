import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChordArr, ChordCollectionType } from '../components/fretboard/types/FretboardTypes';
import { initChordArraySequence, initChordCollection } from '../utils/FretboardConstants';

export default function App({ Component, pageProps }: AppProps) {
  const [chordCollection, setChordCollection] = useState<ChordCollectionType>(
    initChordCollection
  ); 

// const [chordArrSequence, setChordArrSequence] = useState<ChordArr[]>(
//     initChordArraySequence
//   ); 


  const setChordArrSequence = (chordArrSequence:ChordArr[]) => {
    setChordCollection({...chordCollection, midiSequence:chordArrSequence})
  }

  
  useEffect(()=> {
    console.log("app root")
    console.log("app root", chordCollection)
  })



  // console.log(Component)
  return (
    <Component
      chordCollection={chordCollection}
      setChordCollection={setChordCollection}
    />
  );
  // return <Component {...pageProps} />
}
