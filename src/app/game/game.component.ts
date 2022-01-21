import { Component, OnInit, Inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})



export class GameComponent implements OnInit {


  pickCardAnimation = false;
  game!: Game; //constructor doesn't accept game:Game; Error-message: "Property 'game' has no initializer and is not definitely assigned in the constructor."
  //constructor doesn't accept game:Game; Error-message: "Property 'game' has no initializer and is not definitely assigned in the constructor."

  //currentCard: string = ''; //doesn't work with this.currentCard = this.game.stack.pop()
  currentCard: any;


  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.openDialog();
  }


  newGame() {
    this.game = new Game(); //a new Game include everything in Class Game in mpdels game.ts
  }


  takeCard() {

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 400)
    }

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) { //otherwise there is a bug: a new player will be created with an empty band
        this.game.players.push(name);
      }
    });
  }


}