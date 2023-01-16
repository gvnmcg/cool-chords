import React, { useRef, useEffect, useState } from "react";
import { debug, getFret, noteNames, noteNamesSharps, scaleNumbers } from "../utils/FretboardConstants";
import {
  ChordType,
  NoteType,
  ScaleChordType,
  ScaleType,
  TuningType,
} from "../utils/FretboardTypes";

import { colors, intervals, intervalsArr } from "../utils/ColorConstants";
import styles from "../styles/Fretboard.module.css";

const FRET_SPACING = 30;
const STR_SPACING = 20;
const MARGIN = 30;
const FRET_COUNT = 15;

const WIDTH = STR_SPACING * 6 + MARGIN * 2;
const HEIGHT = FRET_SPACING * FRET_COUNT + MARGIN * 2;

const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

const fretbaordCanvasDebug: boolean = debug || true;

interface FretboardCanvasType {
  tuning: TuningType;
  keyNote:number;
  setTuning: (tuning: number[]) => void;
  scale: ScaleType;
  scaleChord: ScaleChordType;
  chordSet: number[];
  setChordSet: (ch: number[]) => void;
}

const FretboardCanvas2 = ({
  tuning,
  setTuning,
  keyNote,
  scale,
  scaleChord,
  chordSet,
  setChordSet,
}: FretboardCanvasType) => {
  // const [noteCursor, setNoteCursor] = useState<NoteType>(initChordNote);
  const [position, setPosition] = useState({ str: 0, fret: 0 });

  const [orientation, setOrientation] = useState<boolean>(true);
  const [cursorDraw, setCursorDraw] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // draw background
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    // orientation ?
    ctx.rect(0, 0, WIDTH, HEIGHT);
    // : ctx.rect(0, 0, HEIGHT, WIDTH);
    ctx.fill();
  };

  const drawNote = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawScaleNote = (
    str: number,
    fret: number,
    ctx: CanvasRenderingContext2D
  ) => {
    // let openNote = tuning[str];
    // let fromOpen = (openNote + fret) % 12;

    let x = str * STR_SPACING + MARGIN;
    let y = fret * FRET_SPACING + MARGIN;

    ctx.fillStyle = colors.grey;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawNoteName = (
    str: number,
    fret: number,
    ctx: CanvasRenderingContext2D
  ) => {

    
    let x = str * STR_SPACING + MARGIN;
    let y = fret * FRET_SPACING + MARGIN;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(noteNamesSharps[(tuning[str] + fret)%12], x - 5, y + 5);
  };

  const drawScaleNotes = (ctx: CanvasRenderingContext2D) => {
    // if (fretbaordCanvasDebug) console.log("drawScaleNotes");
    tuning.forEach((openNote: number, strIx: number) => {
      scale.map((interval: number, chordRoot: number) => (
        (((interval + keyNote) - (openNote%12)) + 12) % 12
      ))
      .filter((n,i)=>scaleChord[i])
      .forEach((fret: number, chordRoot: number) => {
        drawScaleNote(strIx,fret,ctx)
        drawNoteName(strIx,fret,ctx)
      })
    });
  };

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";
    if (fretbaordCanvasDebug)
      console.log(
        "draw chord Notes",
        chordSet.map((chordNote, str) => chordNote - tuning[str])
      );
    chordSet.forEach((chordNote, str) => {
      let x = str * STR_SPACING + MARGIN;
      let y = getFret(tuning, str, chordNote) * FRET_SPACING + MARGIN;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawNoteCursor = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#F000FF";
    let y = position.fret * FRET_SPACING + MARGIN;
    let x = position.str * STR_SPACING + MARGIN;

    ctx.beginPath();
    // ctx.strokeRect(x-5, y-5, 10, 10)
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  const getNoteTarget = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    rect: DOMRect
  ) => {
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let str = Math.floor((x - MARGIN / 2) / STR_SPACING);
    let fret = Math.floor((y - MARGIN / 2) / FRET_SPACING);

    if (fret < 0 || fret > 12) return;
    if (str < 0 || str > 5) return;

    let open = tuning[str];
    let newNote = { str: str, fret: fret, midi: open + fret };
    return newNote;
  };

  const updateChord = (str: number, newNote: number) => {
    
    // constrain to one per string
    setChordSet(
      chordSet.map((note,i)=> str == i ? newNote : note)
    );
  };

  const drawFretMarkers = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "#FFFFFF";
    context.moveTo(MARGIN - 15, FRET_SPACING + 15);
    context.lineTo(WIDTH - MARGIN - 5, FRET_SPACING + 15);
    context.lineWidth = 15;
    context.stroke();
    context.fillStyle = "#FFFFFF";

    [3, 5, 7, 9, 12, 15].forEach((fret) => {
      let x = 6 * STR_SPACING + MARGIN;
      let y = fret * FRET_SPACING + MARGIN;

      context.beginPath();
      context.arc(x, y, 7, 0, 2 * Math.PI);
      context.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (!canvasRef.current) return;
    const context = canvas.getContext("2d");
    if (context == null) throw new Error("Could not get context");

    if (fretbaordCanvasDebug) {
      console.log("fbc useeff tuning,", tuning);
      console.log("fbc useeff chord,", chordSet);
    }

    drawBackground(context);
    drawFretMarkers(context);
    drawScaleNotes(context);
    drawChordNotes(context);
    if (cursorDraw) drawNoteCursor(context);
  });

  return (
    <div className={styles.fretboardContainer}>
      <canvas
        ref={canvasRef}
        width={orientation ? WIDTH : HEIGHT}
        height={orientation ? HEIGHT : WIDTH}
        onClick={(e) => {
          if (!canvasRef.current) return;
          let rect = canvasRef.current.getBoundingClientRect();
          let noteTarget = getNoteTarget(e, rect);
          if (!noteTarget) return;
          updateChord(noteTarget.str, tuning[noteTarget.str] + noteTarget.fret);
        }}
        onMouseMove={(e) => {
          if (!canvasRef.current) return;
          let rect = canvasRef.current.getBoundingClientRect();
          let noteTarget = getNoteTarget(e, rect);
          if (!noteTarget) return;
          setPosition({ str: noteTarget.str, fret: noteTarget.fret });
        }}
        onMouseEnter={(e) => {
          setCursorDraw(true);
        }}
        onMouseLeave={(e) => {
          setCursorDraw(false);
        }}
      />
    </div>
  );
};

export default FretboardCanvas2;
