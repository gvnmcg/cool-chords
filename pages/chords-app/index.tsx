import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import FretboardApp from './FretboardApp'
import { ChordArr, ChordCollectionType } from '../../components/types/FretboardTypes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Download from '../../components/files/Download';

interface FretboardAppProps {
  chordCollection : ChordCollectionType;
  setChordCollection: (co:ChordCollectionType) => void;
  chordArrSequence: ChordArr[]; 
    setChordArrSequence: (seq:ChordArr[]) => void;
  }
  
export default function Home({chordCollection, setChordCollection, chordArrSequence, setChordArrSequence}:FretboardAppProps) {

  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <Link href={"/"} className={styles.backButton}>
        Back
      </Link>
      <button
        className={styles.backButton}
        onClick={() => {
          
          setChordCollection({...chordCollection, midiSequence: chordArrSequence})
          localStorage.setItem(
            chordCollection.id,
            JSON.stringify({
              id: chordCollection.id,
              title: chordCollection.title,
              midiSequence: chordArrSequence,
            })
            );
          }}
      >
        Save
      </button>
      <div > {JSON.stringify(chordCollection)} </div>
      <Download
          chordSequence={chordArrSequence}
        />
      <FretboardApp
        chordArrSequence={chordArrSequence}
        setChordArrSequence={setChordArrSequence}
      />
    </div>
  );
}
