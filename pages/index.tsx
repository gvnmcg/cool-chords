import LocalStore from './localStorage';
import { ChordArr, ChordCollectionType } from '../components/types/FretboardTypes';
import styles from '../styles/Home.module.css'
import Collections from './Collections';

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
      <a className={styles.title}> Cool Chords </a>
      <a className={styles.title} style={{ color: "#BADA55" }}>
        {" "}
        Cool Chords
      </a>
      <Collections
        chordCollection={chordCollection}
        setChordCollection={setChordCollection}
        chordArrSequence={chordArrSequence}
        setChordArrSequence={setChordArrSequence}
      />
    </div>
  );
}
