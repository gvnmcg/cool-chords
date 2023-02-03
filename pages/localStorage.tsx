import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FretboardApp from './chords-app/FretboardApp'
import { ChordArr, ChordSequenceType } from '../components/types/FretboardTypes';
import { useEffect, useState } from 'react';
import bbq from "../sequences/BetterBeQuiet.json"
import wave from "../sequences/wave.json"
import fire from "../sequences/firer.json"
import Link from 'next/link';


interface LocalStoreProps {
    chordArrSequence: ChordArr[]; 
    setChordArrSequence: (seq:ChordArr[]) => void;
  }
  
const LocalStore = ({chordArrSequence, setChordArrSequence}:LocalStoreProps) => {

  const [sequenceList, setSequenceList] = useState<ChordSequenceType[]>(
    []
  );

  useEffect(() => {
    //TEMP: load local json into localStorage
    let jsonArr = [
      { id: "p1", title: "bbq", midiSequence: bbq },
      { id: "p2", title: "wav", midiSequence: wave },
      { id: "p3", title: "fir", midiSequence: fire },
    ];
    
    jsonArr.forEach((seq,ix)=>{
      localStorage.setItem("p" + ix, JSON.stringify(seq))
    } )

    //load sequence FROM localStorage
    let localSeqList = []
    // let lsk = 0;
    for (let lsk = 0; localStorage.key(lsk) !== null; lsk++) {
        let localItem = localStorage.getItem("p" + lsk);
        if (localItem !== null){
            localSeqList.push(JSON.parse(localItem));
        }
    }

    setSequenceList(localSeqList)
    console.log("LocalStore",chordArrSequence)

  },[])

  const sa
      
  return (
    <div className={styles.container}>
      {sequenceList.map((seq, ix) => (
        <span>
          <span>{ix}</span>
          <button onClick={() => setChordArrSequence(seq.midiSequence)}>
            {seq.title}
          </button>
          <Link href='/chords-app' >
            Edit
          </Link>
        </span>
      ))}
    </div>
  );
}

export default LocalStore;