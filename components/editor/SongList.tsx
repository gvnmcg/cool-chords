import { useEffect, useState } from 'react';
import {  } from './types/FretboardTypes';
import Link from 'next/link';
// import bbq from "../sequences/BetterBeQuiet.json"
// import wave from "../sequences/wave.json"
// import fire from "../sequences/firer.json"
import { jsonArr } from '../../utils/FretboardConstants';
import styles from '../styles/Collection.module.css'
import ChordsCanvas from './ChordsCanvas';
import { standardTuning } from '../../utils/FretboardConstants';


const SongPost = ({seq, setChordArrSequence}) => {
  return (
    <div>
      <span className={styles.collectionHead}>
        <h1>{seq.title}</h1>
      </span>
      <div className={styles.collectionView}>
        <Link href="/chords-app">
          <div
            className={styles.editButton}
            onClick={() => setChordArrSequence(seq.midiSequence)}
          >
            Open
          </div>
        </Link>
        <div
          className={styles.editButton}
          onClick={() => setChordArrSequence(seq.midiSequence)}
        >
          Remove
        </div>
        {seq.midiSequence?.map((chord: ChordArr, ix) => {
          return (
            <ChordsCanvas
              chordSet={chord.notes}
              tuning={standardTuning}
              key={ix}
            />
          );
        })}
        {/* <div>{JSON.stringify(seq.midiSequence)}</div> */}
      </div>
    </div>
  );
}



interface SongListProps {
  song : Song;
  setSong: (co:Song) => void;
  }
  

const SongList = ({song, setSong}:SongListProps) => {

  const [newTitle, setNewTitle] = useState<string>("");
  const [newSongTitle, setNewSongTitle] = useState<string>("");

  const [songList, setSongList] = useState<Song[]>(
    jsonArr
  );

  const [songList, setSongList] = useState<Song[]>([]);

  const loadSongJSONToLocalStorage = () => {
    jsonArr.forEach((seq,ix)=>{
      localStorage.setItem("p" + ix, JSON.stringify(seq))
    } )
  }

  const saveSongListToLocalStorage = () => {
    collectionList.forEach((seq,ix)=>{
      localStorage.setItem("p" + ix, JSON.stringify(seq))
    } )
  }

  const createNewSong = (title:string, index: number) => {
    let newCol = {
      id: "p" + index,
      title: title,
      parts: [{ notes: [0, 0, 0, 0, 0, 0], riff: [[]] }],
    }
    localStorage.setItem("p" + newCol.id, JSON.stringify(newCol))
    setSongList([newCol, ...collectionList]);
    setSong(newCol)
    return newCol
  }

  const saveCurenntSongToLocalStorage = (title:string, index: number) => {
    let newCol = {
      id: "p" + index,
      title: title,
      midiSequence: chordArrSequence,
    }
    localStorage.setItem("p" + newCol.id, JSON.stringify(newCol))
    
    return newCol
  }

  
  const loadSongsListFromLocalStorage = () => {
    
    // load sequence FROM localStorage
    let localSeqList = []
    // let lsk = 0;
    for (let lsk = 0; localStorage.key(lsk) !== null; lsk++) {
        let localItem = localStorage.getItem("p" + lsk);
        if (localItem !== null){
            localSeqList.push(JSON.parse(localItem));
        }
    }

    setSongList(localSeqList)
  }

  useEffect(() => {
    loadSongsListFromLocalStorage()
  },[])
  
      
  return (
    <div className={styles.container}>
      <div className={styles.newButton}>
        <input type={"text"} onChange={e=> setNewTitle(e.target.value)}/>
        <div
          onClick={() => {
            let newCol = createNewSong(newTitle, collectionList.length )
            // setSongList([newCol, ...collectionList]);
            // setChordSong(newCol)
          }}
        >
          Create
        </div>
      </div>
      {collectionList.map((seq, ix) => (
        <div className={styles.collection}
        key={ix}>
          <SongPost seq={seq} setChordArrSequence={setChordArrSequence} />
        </div>
      ))}
    </div>
  );
}

export default SongList;