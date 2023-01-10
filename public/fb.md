
very old notes:

purpose:

    save configurations and return to them

    name configuations???
    list configuations???
    list configuations???


Architecture:

    App
        needs: bigstate

            key controls
                needs : key, omited(chords)
                can do: change key, omit  

            fretboard controls
                needs: tuning, omited strings
                can do: tune  

            fretboard display
                needs: bigstate
                can do: --

                GtrString Display
                    needs: string tuning, key state
                    can  : --

[refined]
Architecture:

==h==

    App
        needs: state

            key controls
                needs : scale
                can do: [change scale]
                style : [buttons], [input]

            fretboard controls
                needs: tuning
                can do: changeTuning , reset to standard
                style : [==h==]

            fretboard display
                needs: tuning
                can do: [display strings],[omit strings]
                style : [stings], [omit buttons]

                GtrString Display
                    needs: string tuning, key state
                    can  : --


<span style="color: #FFFF00">Marked text</span>
<mark>Marked text</mark>

```
[+]16[-]
[+]23[-]
[+]31[-]
[+]38[-]
[+]45[-]
[+]52[-]
[Std Tuning][Open D][Open E][Open C][Open A]

-|---|---|-o-|---|-o-|---|-o-|---|-o-|---|---|-%-
-|-3-|-4-|---|-5-|---|-6-|---|-7-|-1-|---|-2-|--
-|-7-|-1-|---|-2-|---|-3-|-4-|---|-5-|---|-6-|--
-|-5-|---|-6-|---|-7-|-1-|---|-2-|---|-3-|-4-|--
-|-2-|---|-3-|-4-|---|-5-|---|-6-|---|-7-|-1-|--
-|-6-|---|-7-|-1-|---|-2-|---|-3-|-4-|---|-5-|--
-|-3-|-4-|---|-5-|---|-6-|---|-7-|-1-|---|-2-|--


---

scale: [0, 2, 4, 5, 7, 9, 11],

const scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];

const scaleNumbers = [0, 0, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7];


-> if scale.contains(i) then ixOf = scale.indexOf(i), return scaleNotes[ixOf]
```

***
NOT GOOD

SUB PAR

COULD BE BETTER
---
```
scale: [ 1, 2, 3, 4, 5, 6, 7]
scale: [ 1,  3,  5] -> root major chord

const scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];

const scaleNumbers = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1];

->  

let fromOpen = (note + i) % 12;


scaleNumbers.reduce ( (a, c, i) => {
    
    if (c){
        a += scaleNoted[c - 1]
    } else {
        a += scaleNoted[c - 1]
    }
})


let rep = "";

  for (let i = 0; i < 12; i++) {
    rep += "-|-";
    rep += notes[(note + i) % 12];
  }


// const notestring  = "-|-C-|---|-D-|---|-E-|-F-|---|-G-|---|-A-|---|-B-";
// const notestring  = "-|-1-|---|-2-|---|-3-|-4-|---|-5-|---|-6-|---|-7-";
// const blankString = "-|---|---|---|---|---|---|---|---|---|---|---|---";
const fretMarkers = "-|---|---|-o-|---|-o-|---|-o-|---|-o-|---|---|-%-";

```

