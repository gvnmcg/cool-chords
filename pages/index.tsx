import Link from 'next/link';
import { ChordArr, ChordCollectionType } from '../components/fretboard/types/FretboardTypes';
import styles from '../styles/Home.module.css'

interface FretboardAppProps {
  chordCollection : ChordCollectionType;
  setChordCollection: (co:ChordCollectionType) => void;
}

export default function Home() {
  
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Cool Chords </h1>
      <h1 className={styles.title}> Cool Chords </h1>
      <h1 className={styles.title} style={{ color: "#BADA55" }}>
        Cool Chords
      </h1>
      <Link href={"/sequences"}>Sequences</Link>
      <Link href={"/collections"}>Songs</Link>
    </div>
  );
}
