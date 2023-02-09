import { useEffect, useState } from 'react';
import { ChordArr, ChordCollectionType, ChordSequenceType } from '../components/types/FretboardTypes';
import Link from 'next/link';
// import bbq from "../sequences/BetterBeQuiet.json"
// import wave from "../sequences/wave.json"
// import fire from "../sequences/firer.json"
import { jsonArr } from '../utils/FretboardConstants';
import styles from '../styles/Collection.module.css'
import ChordsCanvas from '../components/ChordsCanvas';
import { standardTuning } from '../utils/FretboardConstants';

interface CollectionPostProps {
  chordCollection: ChordCollectionType;
  setChordCollection: (co:ChordCollectionType) => void;
}



const CollectionPost = ({chordCollection, setChordCollection}:CollectionPostProps) => {

  return (
    <div>
      <span className={styles.collectionHead}>
        <h1>{chordCollection.title}</h1>
      </span>
      <div className={styles.collectionView}>
        <Link href="/chords-app">
          <div
            className={styles.editButton}
            onClick={() => setChordCollection(chordCollection)}
          >
            Open
          </div>
        </Link>
        {chordCollection.midiSequence?.map((chord:ChordArr, ix) =>  <ChordsCanvas chordSet={chord.notes} tuning={standardTuning} key={ix}/>)}
        {/* <div>{JSON.stringify(seq.midiSequence)}</div> */}
      </div>
    </div>
  );
}



interface CollectionsProps {
  chordCollection: ChordCollectionType;
  setChordCollection: (co: ChordCollectionType) => void;
}
  



const Collections = ({chordCollection, setChordCollection}:CollectionsProps) => {

  const [newTitle, setNewTitle] = useState<string>("");

  const [collectionList, setCollectionList] = useState<ChordSequenceType[]>(
    jsonArr
  );

  const loadHardJSON = () => {
  
    jsonArr.forEach((seq,ix)=>{
      localStorage.setItem("p" + ix, JSON.stringify(seq))
    } )
  }

  // const saveLocalStorage = () => {
  //   collectionList.forEach((seq,ix)=>{
  //     localStorage.setItem("p" + ix, JSON.stringify(seq))
  //   } )
  // }

  const createNewCollection = (title:string, index: number) => {
    let newCol = {
      id: "p" + index,
      title: title,
      midiSequence: [{ notes: [0, 0, 0, 0, 0, 0], riff: [[]] }],
    }
    localStorage.setItem("p" + newCol.id, JSON.stringify(newCol))
    
    return newCol
  }

  const saveCurenntCollection = ( index: number) => {
    localStorage.setItem(chordCollection.id, JSON.stringify(chordCollection))
  }

  const removeCurenntCollection = (index: number) => {
    localStorage.removeItem("p" + index)
  }

  // const createCollectoin = () => {
  //   collectionList.forEach((seq,ix)=>{
  //     localStorage.setItem("p" + ix, JSON.stringify(seq))
  //   } )
  // }

  useEffect(() => {
    // load sequence FROM localStorage
    let localSeqList = []
    // let lsk = 0;
    for (let lsk = 0; localStorage.key(lsk) !== null; lsk++) {
        let localItem = localStorage.getItem("p" + lsk);
        if (localItem !== null){
            localSeqList.push(JSON.parse(localItem));
        }
    }

    setCollectionList(localSeqList)
  
  },[])
  
      
  return (
    <div className={styles.container}>
      <div className={styles.newButton}>
        <input type={"text"} onChange={(e) => setNewTitle(e.target.value)} />
        <div
          onClick={() => {
            let newCol = createNewCollection(newTitle, collectionList.length);
            setCollectionList([newCol, ...collectionList]);
            setChordCollection(newCol);
          }}
        >
          Create
        </div>
      </div>
      {collectionList.map((col, ix) => (
        <div className={styles.collection} key={ix}>
          <CollectionPost
            chordCollection={col}
            setChordCollection={setChordCollection}
          />
          <button
            onClick={() => removeCurenntCollection(ix)}
            style={{ width: "fit-content" }}
          >
            x
          </button>
        </div>
      ))}
      <button onClick={() => loadHardJSON()}>loadHardJSON</button>
      <button onClick={() => localStorage.clear()}>localStorage.clear()</button>
    </div>
  );
}

export default Collections;