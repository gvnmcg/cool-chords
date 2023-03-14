// a javascript function that loads a guitar tablature file
// for example the file 'data/blackbird_tab.txt' contains tablature for the song 'Blackbird'
// parses a '-' delimited guitar tablature file
// and returns an object with array of chord arrays and the tuning of the guitar
// the chord arrays are the notes to be played
// the notes are represented by the fret number
// 'x' means the string is not played
// -1 means the string is muted
// 0 means the string is open
// the first string is the hightest string
// the last string is the lowest string

let blackbird_tab = fetch('blackbird.txt')
    .then(response => response.text())
    // .then(text => text);

console.log(blackbird_tab);


// function tab_parse(tab) { 
//     var lines = tab.split('\n');
//     var tuning = lines[0].split('|')[0];
//     var chords = [];
//     for (var i = 1; i < lines.length; i++) {
//         chords[i] = lines[i].split('-');
//     }
//     return {tuning: tuning, chords: chords};
// }

// console.log(tab_parse(blackbird_tab));