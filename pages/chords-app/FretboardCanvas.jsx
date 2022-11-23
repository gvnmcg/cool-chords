import React, { useRef, useEffect, useState } from "react";

const FRET_HEIGHT = 30;
const STR_WIDTH = 30;
const FRET_SPACING = 5;

const FRET_WIDTH = 30;
const STR_SPACING = 20;
const MARGIN = 30;

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
 const initChordNote = {fret:0, str:0, midi:0};


const FretboardCanvas = ({ tuning, scale }) => {
  let [noteMarker, setNoteMarker] = useState(initChordNote);
  let [chordSet, setChordSet] = useState([initChordNote])
  
  const canvasRef = useRef(null);
  // let rect = undefined;

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
          let x = i * FRET_WIDTH + MARGIN;
          let y = j * STR_SPACING + MARGIN;

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "#FF5733";
          ctx.fillText(noteName, x- 5, y+5);
        }
      }
    }
  };

  const drawChordNotes = (ctx) => {
    ctx.fillStyle = "#BADA55";

    chordSet.forEach(cn => {
      let x = (cn.fret * FRET_HEIGHT) + MARGIN;
      let y = (cn.str * STR_SPACING) + MARGIN;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    })

  }

  const drawNoteMarker = (ctx) => {
    ctx.fillStyle = "#880808	";
    let x = (noteMarker.fret * FRET_HEIGHT) + MARGIN;
    let y = (noteMarker.str * STR_SPACING) + MARGIN;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  const getNoteTarget = (e, rect) => {
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let str = Math.floor((y - MARGIN) / STR_SPACING);
    let fret = Math.floor((x - MARGIN)/FRET_WIDTH);
    
    let open = tuning[str]
    let newNote ={str:str, fret:fret, midi: (open + fret)}
    console.log(newNote)
    return newNote;
  }

  // const updateChord = (e, rect) => {
  //   let x = e.clientX - rect.left;
  //   let y = e.clientY - rect.top;
  //   let str = Math.floor((y - MARGIN) / STR_SPACING);
  //   let fret = Math.floor((x - MARGIN)/FRET_WIDTH);
    
  //   let open = tuning[str]
  //   let newNote ={str:str, fret:fret, midi: (open + fret)}
  //   setChordNote(newNote)
  //   setChordSet([...chordSet, newNote])
  //   console.log(newNote)
  // }

  const updateChord = (e, rect) => {
    let newNote = getNoteTarget(e, rect)
    setChordSet([...chordSet, newNote])
    console.log(newNote)
  }

  const updateNoteMarker = (e, rect) => {
    let newNote = getNoteTarget(e, rect)
    setNoteMarker(newNote)
    console.log(newNote)
  }

  useEffect(() => {
    console.log("redraw");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawStringNotes(context);
    drawChordNotes(context);
    drawNoteMarker(context)
  }
  // , [tuning, scale]
  );

  return <canvas 
      ref={canvasRef} 
      width="500" 
      height="300" 
      onClick={(e) => {
        updateChord(e, canvasRef.current.getBoundingClientRect())
      }}
      onMouseMove={(e) => {
        updateNoteMarker(e, canvasRef.current.getBoundingClientRect())
      }}
    />;
};


function onMouseOverFretboard(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.table(x,y)
}

export default FretboardCanvas;
