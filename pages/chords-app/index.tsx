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
  }
  
export default function Home({chordCollection, setChordCollection}:FretboardAppProps) {

  const saveCurrentCollection = () => {
    localStorage.setItem(
      chordCollection.id,
      JSON.stringify(chordCollection)
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
        onClick={() => saveCurrentCollection()} >
        Save
      </button>
      <Download
          chordCollection={chordCollection}
        />
      <FretboardApp
        chordCollection={chordCollection}
        setChordCollection={setChordCollection}
      />
      <span>New Version Soon!</span>
    </div>
  );
}
