# https://ring-of-fire-9362f.web.app/

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

## 3

PROBLEM <br>
in terminal:<br>
Error: node_modules/@angular/fire/compat/proxy.d.ts:18:78 - error TS2344:<br>
Type 'T[K]' does not satisfy the constraint '(...args: any) => any'. <br>
Type 'T[NonPromiseReturningFunctionPropertyNames<T>]' is not assignable to type '(...args: any) => any'. <br>
...
  
DECLARATION: AngularFire 7.2 doesn't compile with latest Angular 13.1 and Typescript 4.5 <br>
  
SOLUTION <br>
  Add this inside compilerOptions in the tsconfig.json <br>
  <code> "skipLibCheck": true, </code> </br>
  <i>source: https://github.com/angular/angularfire/issues/3090 </i>
           
## 4

PROBLEM <br>
in terminal: WARNING in budgets, maximum exceeded for initial. Budget 2 MB was exceeded by 1.77 MB

SOLUTION <br>
Open angular.json file and find budgets keyword. </br>
<code>
    "budgets": [
       {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
       }
    ]
</code>

<i>source: https://stackoverflow.com/questions/53995948/warning-in-budgets-maximum-exceeded-for-initial</i>

## 5

PROBLEM </br>
building new dist giving <code> base-href = "/" </code>

SOLUTION </br>
in terminal: <code> ng build --base-href="/ringoffire/" </code>


## 6

PROBLEM

on console: FirebaseError: <code> Missing or insufficient permission </code>

SOLUTION

on firebase.google set Database / Rules : <code>allow read, write: if true</code>

but this allows everyone to be able to read and write on this datenbank. But it's ok, because it's still a test.

# https://ring-of-fire-9362f.web.app/