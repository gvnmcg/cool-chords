import React, { useRef, useEffect } from "react";

import { Chord, Tuning } from "./constants/Types";
import { debugAll, getFret } from "./constants/Constants";

import styles from "styles/editor/ChordCanvas.module.css";

const FRET_SPACING = 10;
const STR_SPACING = 7;
const MARGIN = 5;

interface ChordsCanvasProps {
  chord: Chord;
  tuning: Tuning;
}

const ChordsCanvas = ({ chord, tuning }: ChordsCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // draw background
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, 50, 200);
    ctx.fill();
  };

  const drawFretMarkers = (ctx: CanvasRenderingContext2D) => {
    // draw background
    let fretMarkers = [3, 5, 7, 9, 12, 15];
    fretMarkers.forEach((marker: number) => {
      ctx.fillStyle = "#FFFFFF";
      let x = STR_SPACING; // * 3 + MARGIN
      let y = marker * FRET_SPACING + MARGIN;
    });
  };

  // const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
  //   ctx.fillStyle = "#BADA55";
  //   chord.forEach((cn, str) => {
  //     ctx.fillStyle = "#BADA55";
  //     let x = str * STR_SPACING + MARGIN;
  //     let y = getFret(tuning, str, cn) * FRET_SPACING + MARGIN;
  //     ctx.beginPath();
  //     ctx.arc(x, y, 2, 0, 2 * Math.PI);
  //     ctx.fill();
  //   });
  // };

  useEffect(() => {
    const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#BADA55";
      chord.shape.forEach((note: number, str: number) => {
        ctx.fillStyle = "#BADA55";
        let x = str * STR_SPACING + MARGIN;
        let y = getFret(tuning, str, note) * FRET_SPACING + MARGIN;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (canvasRef.current) {
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      drawBackground(context);
      drawFretMarkers(context);
      drawChordNotes(context);
    }
    if (debugAll) console.log("chord canvas chord.shape", chord.shape);
  }, [tuning, chord]);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width="50"
      height="200"
      onClick={(e) => {
        // updateChordIndex();
      }}
    />
  );
};

export default ChordsCanvas;
