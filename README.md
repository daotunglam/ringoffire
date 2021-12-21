# THE PROBLEMS I GOT WHILE WRITING THIS PROJECT:

## 1

PROBLEM: <br>
in game.component.ts: <br>
game: Game; <br>
ERROR: "Property 'game' has no initializer and is not definitely assigned in the constructor."

SOLUTION: <br>
game!: Game;

## 2

PROBLEM: <br>
function shuffle(array) {...} <br>
//ERROR Parameter 'array' implicitly has an 'any' type.

SOLUTION: <br>
funtion shuffle(array : any){...} <br>

<i>source: https://stackoverflow.com/questions/43064221/typescript-ts7006-parameter-xxx-implicitly-has-an-any-type <i>
