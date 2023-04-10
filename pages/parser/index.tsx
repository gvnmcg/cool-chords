import { useEffect, useState } from "react";
import Link from "next/link";
import { Song } from "../../components/editor/constants/Types";
import styles from "../../styles/editor/Parser.module.css";

interface SongEditorProps {
  song: Song;
  setSong: (seq: Song) => void;
}

type TabNote = {
  fret: number;
  str: number;
  time: number;
  bar: number;
};

export default function Home({ song, setSong }: SongEditorProps) {
  const [parserText, setParserText] = useState<string>("");
  const [songLines, setSongLines] = useState<string[]>([]);
  const [tabNotes, setTabNotes] = useState<TabNote[]>([]);

  function isCharNumber(c: string) {
    return c >= "0" && c <= "9";
  }

  const parseSong = (text: string) => {
    const tabNotes: TabNote[] = [];
    // parse blocks
    const splitSongBlocks = text.split("\n\n");

    splitSongBlocks.forEach((block, blockIndex) => {

        //parse lines
        const splitSongLines = block.split("\n");
        splitSongLines.forEach((line, index) => {
        tabNotes.push(...parseLine(line, index + 1));
        });
    })

    console.log(tabNotes.sort((a, b) => a.time - b.time));
  };

  const parseLine = (text: string, lineIndex: number) => {
    //   const numbers = text.match(/\d+/g); // Extract all numbers using regular expression
    const result = []; // Array to store parsed numbers
    let bar = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] == "|") bar++;
      if (isCharNumber(text[i])) {
        const num = parseInt(text[i]); // Parse the number as integer
        const placeInLineIndex = i + 1; // Place in line index (1-based)
        result.push({
          fret: num,
          time: placeInLineIndex,
          str: lineIndex,
          bar: bar,
        });
      }
    }
    return result;
  };

  const saveCurrentSongToLocalStorage = () => {
    localStorage.setItem("" + song.id, JSON.stringify(song));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // const data = new FormData(event.target);
    // console.log(data.get("parseField"));
    // console.log(parserText);
    parseSong(parserText);
  };

  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <Link href={"/"} className={styles.backButton}>
        Back
      </Link>
      <button
        className={styles.backButton}
        onClick={() => saveCurrentSongToLocalStorage()}
      >
        Save
      </button>

      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.parseField}
          placeholder="Paste song here"
          onChange={(e) => setParserText(e.target.value)}
        />
        <button className={styles.backButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
