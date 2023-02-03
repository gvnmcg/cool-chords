import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChordArr } from '../components/types/FretboardTypes';
import { initChordArraySequence } from '../utils/FretboardConstants';

export default function App({ Component, pageProps }: AppProps) {
  const [chordArrSequence, setChordArrSequence] = useState<ChordArr[]>(
    initChordArraySequence
  ); 

  useEffect(()=> {
    console.log("app root")
    console.log("app root", chordArrSequence)
  })

  // console.log(Component)
  return (
    <Component
      chordArrSequence={chordArrSequence}
      setChordArrSequence={setChordArrSequence}
    />
  );
  // return <Component {...pageProps} />
}
