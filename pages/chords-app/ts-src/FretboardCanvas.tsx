import React, { useRef, useEffect, useState } from "react";
import { debug, noteNames, scaleNumbers } from "./FretboardConstants";
import { ChordType, NoteType, ScaleType, TuningType } from "./FretboardTypes";

import colors, { intervalsArr } from "./ColorConstants";

const FRET_HEIGHT = 30;
const STR_WIDTH = 30;
const FRET_SPACING = 5;

const FRET_WIDTH = 30;
const STR_SPACING = 20;
const MARGIN = 30;

const WIDTH = (FRET_WIDTH + FRET_SPACING) * 12;
const HEIGHT = STR_WIDTH * 6;

const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

const fretbaordCanvasDebug: boolean = debug || false;

interface FretboardCanvasType {
  tuning: TuningType;
  scale: ScaleType;
  chordSet: NoteType[];
  setChordSet: (ch: NoteType[]) => void;
}

const FretboardCanvas = ({
  tuning,
  scale,
  chordSet,
  setChordSet,
}: FretboardCanvasType) => {
  const [noteCursor, setNoteCursor] = useState<NoteType>(initChordNote);
  const [orientation, setOrientation] = useState<boolean>(false);
  const [cursorDraw, setCursorDraw] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // draw background
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    orientation ? ctx.rect(0, 0, WIDTH, HEIGHT) : ctx.rect(0, 0, HEIGHT, WIDTH);
    ctx.fill();
  };

  const drawNote = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawNoteName = (
    noteName: string,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) => {
    // ctx.fillStyle = "#FF5733";
    ctx.fillText(noteName, x - 5, y + 5);
  };

  const drawScale = (ctx: CanvasRenderingContext2D) => {
    tuning.forEach((openNote: number, j: number) => {
      // let note = tuning[j];
      let fretCount = 13;
      // draw notes on the string
      for (let i = 0; i < fretCount; i++) {
        let fromOpen = (openNote + i) % 12;

        // if (scale[scaleNumbers[fromOpen] - 1]) {
        let noteName = noteNames[fromOpen];
        let x = i * FRET_WIDTH + MARGIN;
        let y = j * STR_SPACING + MARGIN;

        if (!orientation) {
          let temp = x;
          x = y;
          y = temp;
        }

        // ctx.fillStyle = intervalsArr[fromOpen];
        ctx.fillStyle = colors.grey;
        drawNote(x, y, ctx);
        ctx.fillStyle = colors.white;
        drawNoteName(noteName, x, y, ctx);
        // }
      }
    });
  };

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";

    chordSet.forEach((cn) => {
      let x = (cn.midi - tuning[cn.str]) * FRET_HEIGHT + MARGIN;
      // let x = cn.fret * FRET_HEIGHT + MARGIN;
      let y = cn.str * STR_SPACING + MARGIN;

      if (!orientation) {
        let temp = x;
        x = y;
        y = temp;
      }
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawNoteCursor = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#F000FF";
    let x = noteCursor.fret * FRET_HEIGHT + MARGIN;
    let y = noteCursor.str * STR_SPACING + MARGIN;

    if (!orientation) {
      let temp = x;
      x = y;
      y = temp;
    }
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  const getNoteTarget = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    rect: DOMRect
  ) => {
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (!orientation) {
      let temp = x;
      x = y;
      y = temp;
    }

    let str = Math.floor((y - MARGIN / 2) / STR_SPACING);
    let fret = Math.floor((x - MARGIN / 2) / FRET_WIDTH);

    if (fret < 0 || fret > 12) return;
    if (str < 0 || str > 5) return;

    let open = tuning[str];
    let newNote = { str: str, fret: fret, midi: open + fret };
    return newNote;
  };

  const updateChord = (newNote: NoteType) => {
    // constrain to one per string
    let newSet = chordSet.filter((chordNote) => {
      return chordNote.str != newNote.str;
    });
    setChordSet([...newSet, newNote]);
    if (fretbaordCanvasDebug) console.log("update chord", newSet);
  };

  const updateNoteCursor = (newNote: NoteType) => {
    setNoteCursor(newNote);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (!canvasRef.current) return;
    const context = canvas.getContext("2d");
    if (context == null) throw new Error("Could not get context");

    drawBackground(context);
    drawScale(context);
    drawChordNotes(context);
    if (cursorDraw) drawNoteCursor(context);
  });

  return (
    <canvas
      ref={canvasRef}
      width={orientation ? WIDTH : HEIGHT}
      height={orientation ? HEIGHT : WIDTH}
      onClick={(e) => {
        if (!canvasRef.current) return;
        let rect = canvasRef.current.getBoundingClientRect();
        let noteTarget = getNoteTarget(e, rect);
        if (!noteTarget) return;
        updateChord(noteTarget);
      }}
      onMouseMove={(e) => {
        if (!canvasRef.current) return;
        let rect = canvasRef.current.getBoundingClientRect();
        let noteTarget = getNoteTarget(e, rect);
        if (!noteTarget) return;
        updateNoteCursor(noteTarget);
      }}
      onMouseEnter={(e)=>{
        setCursorDraw(true)
      }}
      onMouseLeave={(e)=>{
        setCursorDraw(false)
      }}
    />
  );
};

export default FretboardCanvas;
