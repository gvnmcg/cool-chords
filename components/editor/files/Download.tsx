import React, { useState } from "react";
import { Chord, Song } from "../constants/Types";

interface DownloadProps {
  song: Song;
}

const Download = ({
  song,
}: DownloadProps) => {
  const [files, setFiles] = useState("");
  const [fileName, setFilename] = useState("sequence");

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
      <span>FileName:</span>
      <input type="text" onChange={(e) => setFilename(e.target.value)} />
      <a
        style={{ backgroundColor: "lightgreen", color: "black" }}
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(song)
        )}`}
        download={fileName + ".json"}
      >
        Download JSON
      </a>
    </div>
  );
};

export default Download;
