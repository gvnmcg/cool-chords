import { ChordArr, ChordCollectionType } from '../components/fretboard/types/FretboardTypes';
import styles from '../styles/Home.module.css'
import Collections from '../components/collections/Collections';

interface FretboardAppProps {
  chordCollection : ChordCollectionType;
  setChordCollection: (co:ChordCollectionType) => void;
}

export default function Home({chordCollection, setChordCollection}:FretboardAppProps) {
  
  
  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <a className={styles.title}> Cool Chords </a>
      <a className={styles.title} style={{ color: "#BADA55" }}>
        {" "}
        Cool Chords
      </a>
      <Collections
        chordCollection={chordCollection}
        setChordCollection={setChordCollection}
      />
    </div>
  );
}
