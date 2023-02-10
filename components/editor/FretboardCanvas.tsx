import React, { useRef, useEffect, useState } from "react";

import {
  Chord,
  ScaleChord,
  ScaleIntervals,
  Tuning,
} from "./constants/Types";

import { colors } from "./constants/ColorConstants";
import { debugAll, getFret, noteNamesSharps } from "./constants/Constants";
import styles from "../../styles/Fretboard.module.css";

const FRET_SPACING = 30;
const STR_SPACING = 20;
const MARGIN = 30;
const FRET_COUNT = 15;

const WIDTH = STR_SPACING * 6 + MARGIN * 2;
const HEIGHT = FRET_SPACING * FRET_COUNT + MARGIN * 2;


const fretboardCanvasDebug: boolean = debugAll || false;

interface FretboardCanvasProps {
  width: number;
  height: number;
  orientation: boolean;
  play: (str: number, when: number) => void;
  tuning: Tuning;
  keyTonic: number;
  scale: ScaleIntervals;
  scaleChord: ScaleChord;
  chord: Chord;
  updateChord: (str: number, newNote: number) => void;
  riffMode: boolean;
}

const FretboardCanvas = ({
  width,
  height,
  orientation,
  play,
  tuning,
  keyTonic,
  scale,
  scaleChord,
  chord,
  updateChord,
  riffMode,
}: FretboardCanvasProps) => {

  const [position, setPosition] = useState({ str: 0, fret: 0 });
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
    ctx.fillText(noteNamesSharps[(tuning[str] + fret) % 12], x - 5, y + 5);
  };

  const drawScaleNotes = (ctx: CanvasRenderingContext2D) => {
    // if (fretboardCanvasDebug) console.log("drawScaleNotes");
    tuning.forEach((openNote: number, strIx: number) => {
      scale
        .map(
          (interval: number, chordRoot: number) =>
            (interval + keyTonic - (openNote % 12) + 12) % 12
        )
        .filter((n, i) => scaleChord[i])
        .forEach((fret: number, chordRoot: number) => {
          drawScaleNote(strIx, fret, ctx);
          // drawNoteName(strIx, fret, ctx);
        });
    });
  };

  const drawScaleNoteNames = (ctx: CanvasRenderingContext2D) => {
    // if (fretboardCanvasDebug) console.log("drawScaleNotes");
    tuning.forEach((openNote: number, strIx: number) => {
      scale
        .map(
          (interval: number, chordRoot: number) =>
            (interval + keyTonic - (openNote % 12) + 12) % 12
        )
        .filter((n, i) => scaleChord[i])
        .forEach((fret: number, chordRoot: number) => {
          // drawScaleNote(strIx, fret, ctx);
          drawNoteName(strIx, fret, ctx);
        });
    });
  };

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";
    if (fretboardCanvasDebug)
      console.log(
        "draw chord Notes",
        chord.shape.map((chordNote, str) =>
          chordNote !== 0 ? chordNote - tuning[str] : "X"
        )
      );
    chord.shape.forEach((chordNote, str) => {
      let x = str * STR_SPACING + MARGIN;
      let y = getFret(tuning, str, chordNote) * FRET_SPACING + MARGIN;
      // muted string
      if (chordNote == 0) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.rect(x - 7, 0, 15, HEIGHT);
        ctx.fill();
        return;
      }
      // open string
      // if (getFret(tuning, str, chordNote) == 0) {
      //   ctx.fillStyle = "#BADA55";
      //   ctx.beginPath();
      //   ctx.rect(x - 3, 0, 5, HEIGHT);
      //   ctx.fill();
      // }
      ctx.fillStyle = "#BADA55";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawRiffNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FF0000";
    if (fretboardCanvasDebug)
      console.log(
        "draw chord Notes",
        chord.shape.map((chordNote, str) => chordNote - tuning[str])
      );
    chord.shape.forEach((chordNote, str) => {
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


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (!canvasRef.current) return;
    const context = canvas.getContext("2d");
    if (context == null) throw new Error("Could not get context");

    drawBackground(context);
    drawScaleNotes(context);
    drawChordNotes(context);
    if (cursorDraw) drawNoteCursor(context);
    drawScaleNoteNames(context);
    drawFretMarkers(context);
  } );

  return (
    <div className={styles.fretboardContainer}>
       <button onClick={()=>{
        chord.shape.forEach((n, i) => {
          play(i, i / 4);
        });
      }}
      >Strum</button>
      <canvas
        ref={canvasRef}
        width={orientation ? WIDTH : HEIGHT}
        height={orientation ? HEIGHT : WIDTH}
        onClick={(e) => {
          if (!canvasRef.current) return;
          let rect = canvasRef.current.getBoundingClientRect();
          let noteTarget = getNoteTarget(e, rect);
          if (!noteTarget) return;
          play(noteTarget.str, 0)
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

export default FretboardCanvas;
