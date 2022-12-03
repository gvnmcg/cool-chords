import React, { useRef, useEffect, useState } from "react";
import { debug, noteNames, scaleNumbers } from "./FretboardConstants";
import { ChordType, NoteType, ScaleType, TuningType } from "./FretboardTypes";

const FRET_HEIGHT = 30;
const STR_WIDTH = 30;
const FRET_SPACING = 5;

const FRET_WIDTH = 30;
const STR_SPACING = 20;
const MARGIN = 30;

const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

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

  const [cursorRedraw, setCursorRedraw] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawScale = (ctx: CanvasRenderingContext2D) => {
    // draw background
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, 500, 1000);
    ctx.fill();

    // draw guitar string
    for (let j = 0; j < 6; j++) {
      let note = tuning[j];

      // draw notes on the string
      for (let i = 0; i < 13; i++) {
        let fromOpen = (note + i) % 12;
        if (scale[scaleNumbers[fromOpen] - 1]) {
          let noteName = noteNames[fromOpen];
          let x = i * FRET_WIDTH + MARGIN;
          let y = j * STR_SPACING + MARGIN;

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "#FF5733";
          ctx.fillText(noteName, x - 5, y + 5);
        }
      }
    }
  };

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";

    chordSet.forEach((cn) => {

      let x = (cn.midi - tuning[cn.str]) * FRET_HEIGHT + MARGIN;
      // let x = cn.fret * FRET_HEIGHT + MARGIN;
      let y = cn.str * STR_SPACING + MARGIN;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawNoteCursor = (ctx: CanvasRenderingContext2D) => {
    
    ctx.fillStyle = "#F000FF";
    let x = noteCursor.fret * FRET_HEIGHT + MARGIN;
    let y = noteCursor.str * STR_SPACING + MARGIN;

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
    let str = Math.floor((y - MARGIN/2) / STR_SPACING);
    let fret = Math.floor((x - MARGIN/2) / FRET_WIDTH);

    // if (fret < 0 || fret > 12) return;
    // if (str < 0 ||  str > 5) return;

    let open = tuning[str];
    let newNote = { str: str, fret: fret, midi: open + fret };
    return newNote;
  };

  const updateChord = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    rect: DOMRect
  ) => {
    let newNote = getNoteTarget(e, rect);
    // constrain to one per string
    let newSet = chordSet.filter( chordNote => {
      return (
        chordNote.str != newNote.str
      )
    })
    setChordSet([...newSet, newNote]);
    if (debug) console.log("update chord", newSet);

  };

  const updateNoteCursor = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    rect: DOMRect
  ) => {
    let newNote = getNoteTarget(e, rect);
    setNoteCursor(newNote);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (canvasRef.current) {
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      drawScale(context);
      drawChordNotes(context);
      drawNoteCursor(context);
    }
    // if (debug && !cursorRedraw) console.log("redraw", scale);
    // if (cursorRedraw) setCursorRedraw(false)
  });

  return (
    <canvas
      ref={canvasRef}
      width={(FRET_WIDTH + FRET_SPACING) * 12}
      height={STR_WIDTH * 6}
      onClick={(e) => {
        if (!canvasRef.current) return;
        updateChord(e, canvasRef.current.getBoundingClientRect());
      }}
      onMouseMove={(e) => {
        setCursorRedraw(true)
        if (!canvasRef.current) return;
        updateNoteCursor(e, canvasRef.current.getBoundingClientRect());
      }}
    />
  );
};

export default FretboardCanvas;
