import React, { useRef, useEffect, useState } from "react";
import { debug, noteNames, scaleNumbers } from "../FretboardConstants";
import { ChordType, NoteType, ScaleType, TuningType } from "../FretboardTypes";
import styles from "../../../../styles/Chords.module.css";

const FRET_HEIGHT = 10;
const STR_WIDTH = 15;
const FRET_SPACING = 5;

const FRET_WIDTH = 30;
const STR_SPACING = 7;
const STR_HEIGHT = 5;
const MARGIN = 12;

const initChordNote: NoteType = { fret: 0, str: 0, midi: 0 };

interface ChordsCanvasType {
  chordSet: NoteType[];
  tuning:TuningType;
}

const ChordsCanvas = ({
  chordSet,
  tuning,
}: ChordsCanvasType) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
      // draw background
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, 50, 200);
    ctx.fill();
  }

  const drawFretMarkers = (ctx: CanvasRenderingContext2D) => {
    // draw background
    let fretMarkers = [3,5,7,9,12,15]
    fretMarkers.forEach((marker:number) => {
      ctx.fillStyle = "#FFFFFF";
      let x = STR_SPACING // * 3 + MARGIN
      let y = (marker * FRET_HEIGHT) + MARGIN
    })
  }

  const drawChordNotes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#BADA55";
    chordSet.forEach((cn:NoteType) => {
      ctx.fillStyle = "#BADA55";
      let x = (6 * STR_SPACING + MARGIN) - (cn.str * STR_SPACING + MARGIN);
      let y = cn.fret * FRET_HEIGHT + MARGIN;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error("Could not get canvas");
    if (canvasRef.current) {
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      drawBackground(context)
      drawFretMarkers(context)
      drawChordNotes(context);
    }
    if (debug) console.log("chord canvas chordSet", chordSet);

  }, [tuning, chordSet]);

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
