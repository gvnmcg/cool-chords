import React, { useRef, useEffect, useState } from "react";
import { debug, noteNames, scaleNumbers } from "../FretboardConstants";
import { ChordType, NoteType, ScaleType, TuningType } from "../FretboardTypes";
import styles from "../../../../styles/Chords.module.css";

const FRET_HEIGHT = 5;
const STR_WIDTH = 15;
const FRET_SPACING = 5;

const FRET_WIDTH = 30;
const STR_SPACING = 3;
const MARGIN = 12;

const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

interface ChordsCanvasType {
  chordSet: NoteType[];
}

const ChordsCanvas = ({
  chordSet,
}: ChordsCanvasType) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";

    chordSet.forEach((cn:NoteType) => {
      let y = cn.fret * FRET_HEIGHT + MARGIN;
      let x = cn.str * STR_SPACING + MARGIN;

      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    });
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (canvasRef.current) {
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      drawChordNotes(context);
    }
    if (debug) console.log("chordSet", chordSet);

  });

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width="50"
      height="100"
      onClick={(e) => {
        // updateChordIndex();
      }}
    />
  );
};

export default ChordsCanvas;
