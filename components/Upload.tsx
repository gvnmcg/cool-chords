
import React, { useState } from "react";
import { ChordSequenceType } from "../utils/FretboardTypes";

interface UploadProps {
  setSequenceList: (list: ChordSequenceType[]) => void;
}

const Upload =({ setSequenceList }:UploadProps) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [files, setFiles] = useState("");

  const handleChange = (event:React.FormEvent) => {
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
      <button onClick={()=>setShowModal(!showModal)}>Upload Sequence JSON file</button>
      {showModal ? (
        <div>
          <input type="file" onChange={handleChange} />
          <br />
          {"uploaded file content -- " + files}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Upload;