import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FretboardApp from './chords-app/FretboardApp'
import { ChordArr } from '../components/types/FretboardTypes';
import { useEffect, useState } from 'react';
import bbq from "../sequences/BetterBeQuiet.json"
import LocalStore from './localStorage';

interface FretboardAppProps {
  chordArrSequence: ChordArr[]; 
  setChordArrSequence: (seq:ChordArr[]) => void;
}

export default function Home({chordArrSequence, setChordArrSequence}:FretboardAppProps) {
 
  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <LocalStore 
       chordArrSequence={chordArrSequence}
       setChordArrSequence={setChordArrSequence}
       />
       <div>
        {JSON.stringify(chordArrSequence)}
       </div>
      {/* <FretboardApp
        chordArrSequence={chordArrSequence}
        setChordArrSequence={setChordArrSequence}
      /> */}
    </div>
  );
}
