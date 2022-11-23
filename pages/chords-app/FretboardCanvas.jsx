import React, { useRef, useEffect } from "react";

const noteNames = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];

const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];

const FretboardCanvas = ({ tuning, scale }) => {
  const canvasRef = useRef(null);

  const drawStringNotes = (ctx) => {
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
          let x = i * 30 + 30;
          let y = j * 20 + 30;

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "#FF5733";
          ctx.fillText(noteName, x, y);
        }
      }
    }
  };

  useEffect(() => {
    console.log("redraw");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawStringNotes(context);
  }, [tuning, scale]);

  return <canvas 
      ref={canvasRef} 
      width="500" 
      height="300" 
      onClick={(e) => {onMouseOverFretboard(e)}}
      
    />;
};

function drawGuitarString(context, tuning, scale) {}
function onMouseOverFretboard(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.table(x,y)
}

export default FretboardCanvas;
