import React, { useState } from "react";
import { ChordSequenceType } from "../utils/FretboardTypes";

interface DownloadProps {
  sequenceList: ChordSequenceType[];
  setSequenceList: (list: ChordSequenceType[]) => void;
  chordSequence: ChordSequenceType;
}

const Download = ({
  sequenceList,
  setSequenceList,
  chordSequence,
}: DownloadProps) => {
  const [files, setFiles] = useState("");

  const handleChange = (event: React.FormEvent) => {
    // const fileReader = new FileReader();
    // fileReader.readAsText(event.target.files[0], "UTF-8");
    // fileReader.onload = e => {
    //   if (e.target == null) return;
    //   console.log("e.target.result", e.target.result);
    //   if (e.target.result == null) return;
    //   // setSequenceList(JSON.parse(e.target.result.toString()));
    //   setFiles(JSON.parse(e.target.result.toString()))
    // };
  };
  return (
    <div>
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(sequenceList)
        )}`}
        download="filename.json"
      >
        {`Download Json`}
      </a>
      <button
        onClick={() => setSequenceList(sequenceList.concat(chordSequence))}
      >
        save sequence
      </button>
    </div>
  );
};

export default Download;
