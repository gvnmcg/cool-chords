import { useEffect, useState } from "react";
import {
  ChordArr,
  ChordCollectionType,
  ChordSequenceType,
} from "../components/types/FretboardTypes";
import Link from "next/link";
// import bbq from "../sequences/BetterBeQuiet.json"
// import wave from "../sequences/wave.json"
// import fire from "../sequences/firer.json"
import { jsonArr } from "../utils/FretboardConstants";
import styles from "../styles/Collection.module.css";
import ChordsCanvas from "../components/ChordsCanvas";
import { standardTuning } from "../utils/FretboardConstants";

interface CollectionPostProps {
  chordCollection: ChordCollectionType;
  setChordCollection: (co: ChordCollectionType) => void;
  removeCurrentCollection: (ix: number) => void;
}

const CollectionPost = ({
  chordCollection,
  setChordCollection,
  removeCurrentCollection,
}: CollectionPostProps) => {
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
        {chordCollection.midiSequence?.map((chord: ChordArr, ix) => (
          <ChordsCanvas
            chordSet={chord.notes}
            tuning={standardTuning}
            key={ix}
          />
        ))}
      </div>
      <button
        onClick={() => removeCurrentCollection(parseInt(chordCollection.id))}
        style={{ width: "fit-content" }}
      >
        x
      </button>
    </div>
  );
};

interface CollectionsProps {
  chordCollection: ChordCollectionType;
  setChordCollection: (co: ChordCollectionType) => void;
}

const Collections = ({
  chordCollection,
  setChordCollection,
}: CollectionsProps) => {
  const [createMode, setCreateMode] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string>("");

  const [collectionList, setCollectionList] = useState<ChordSequenceType[]>([]);

  // create new collection and add to localStorage
  const createNewCollection = (
    title: string,
    ix: number
  ): ChordSequenceType => {
    let newCollection = {
      title: title,
      midiSequence: [],
      id: "" + ix,
    };
    localStorage.setItem("" + ix, JSON.stringify(newCollection));
    return newCollection;
  };

  //add new collection to list and to localStorage
  const addNewCollection = (newCollection: ChordSequenceType) => {
    setCollectionList(collectionList.concat(newCollection));
    localStorage.setItem(
      "" + collectionList.length,
      JSON.stringify(newCollection)
    );
  };

  //remove current collection from list and from localStorage
  const removeCurrentCollection = (ix: number) => {
    let newColList = collectionList.filter((col, i) => i !== ix);
    setCollectionList(newColList);
    localStorage.removeItem("" + ix);
  };

  // fill collection list from localStorage
  const fillCollectionListFromLocalStorage = () => {
    let localSeqList: ChordSequenceType[] = [];
    for (let lsk = 0; localStorage.key(lsk) !== null; lsk++) {
      let localItem = localStorage.getItem("" + lsk);
      if (localItem !== null) {
        localSeqList.push(JSON.parse(localItem));
      }
    }
    setCollectionList(localSeqList);
  };

  useEffect(() => {
    fillCollectionListFromLocalStorage();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.topButton}
          onClick={() => setCreateMode(true)}
        >
          Create
        </button>
      </div>

      {createMode && (
        <div className={styles.createContainer}>
          <input type={"text"} onChange={(e) => setNewTitle(e.target.value)} />
          <button
            onClick={() => {
              setCollectionList([
                ...collectionList,
                createNewCollection(newTitle, collectionList.length),
              ]);
              setCreateMode(false);
            }}
          >
            Create
          </button>
          <button onClick={() => setCreateMode(false)}>Cancel</button>
        </div>
      )}

      {collectionList.map((col, ix) => (
        <div className={styles.collection} key={ix}>
          <CollectionPost
            chordCollection={col}
            setChordCollection={setChordCollection}
            removeCurrentCollection={removeCurrentCollection}
          />
        </div>
      ))}
      <h2>Examples</h2>
      {jsonArr.map((col, ix) => (
        <div className={styles.collection} key={ix}>
          <CollectionPost
            chordCollection={col}
            setChordCollection={setChordCollection}
            removeCurrentCollection={removeCurrentCollection}
          />
        </div>
      ))}
    </div>
  );
};

export default Collections;
