import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})



export class GameComponent implements OnInit {

  gameOnLocal!: Game; //constructor doesn't accept game:Game; Error-message: "Property 'game' has no initializer and is not definitely assigned in the constructor."
  //constructor doesn't accept game:Game; Error-message: "Property 'game' has no initializer and is not definitely assigned in the constructor."

  gameId!: string;


  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.generateGameOnLocal();
    this.getDataFromFirebase();

    /**
     * open dialog add-player if there are less than 2 players.
     */
    setTimeout(() => {
      if (this.gameOnLocal.players.length < 2) {
        this.openDialog();
      }
    }, 1500)
  }

  /**
   * generates a new Game containing players array, stack of cards array, etc. with nothing in it.
   */
  generateGameOnLocal() {
    this.gameOnLocal = new Game(); //a new Game include everything in Class Game in mpdels game.ts
  }

  getDataFromFirebase() {
    this.getIdOfCollection();
    this.getDocumentFieldOfCollection();
  }

  /**
   * specifies the id of document of the collection 'games'
   */
  getIdOfCollection() {
    this.route.params.subscribe((params: any) => {
      this.gameId = params['id']
    })
  }

  /**
   * gets the data of the document of the collection by Id,
   * and put them in to gameOnLocal.
   */
  getDocumentFieldOfCollection() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe(
        (gameFromFirebase: any) => {
          this.gameOnLocal.players = gameFromFirebase.players;
          this.gameOnLocal.avatars = gameFromFirebase.avatars;
          this.gameOnLocal.stack = gameFromFirebase.stack;
          this.gameOnLocal.dummyStack = gameFromFirebase.dummyStack;
          this.gameOnLocal.playedCards = gameFromFirebase.playedCards;
          this.gameOnLocal.currentPlayer = gameFromFirebase.currentPlayer;
          this.gameOnLocal.pickCardAnimation = gameFromFirebase.pickCardAnimation;
          this.gameOnLocal.currentCard = gameFromFirebase.currentCard;
        }
      );
  }

  play() {
    if (this.gameOnLocal.players.length >= 2) {
      if (this.gameOnLocal.stack.length == this.gameOnLocal.dummyStack.length &&
        this.gameOnLocal.dummyStack.length > 0
      ) {
        this.gameOnLocal.dummyStack.splice(0, 1)
        this.saveGame()
      }
      this.takeCard()
    }
    else {
      alert('PLEASE ADD AT LEAST 2 PLAYERS');
      this.openDialog();
    }
  }

  /**
   * flip a card by clicking on the stack of cards.
   */
  takeCard() {

    if (!this.gameOnLocal.pickCardAnimation) {
      this.gameOnLocal.currentCard = this.gameOnLocal.stack.pop();
      this.gameOnLocal.pickCardAnimation = true;
      this.gameOnLocal.currentPlayer++;
      this.gameOnLocal.currentPlayer = this.gameOnLocal.currentPlayer % this.gameOnLocal.players.length;
      this.saveGame();

      setTimeout(() => {
        this.gameOnLocal.playedCards.push(this.gameOnLocal.currentCard);
        this.gameOnLocal.pickCardAnimation = false;
        this.saveGame();
      }, 400)
    }

  }


  /**
   * open dialog of adding new player.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) { //otherwise there is a bug: a new player will be created with an empty band
        this.gameOnLocal.players.push(name);
        this.gameOnLocal.avatars.push('profile.png');
        this.saveGame();
      }
    });
  }

  /**
   * opens diaglog Edit Player.
   * @param i index of the current player
   */
  editPlayer(i: any) {

    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.gameOnLocal.players.splice(i, 1)
        } else {
          this.gameOnLocal.avatars[i] = change;
        }

        this.saveGame();
      }

    });

  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.gameOnLocal.toJSON())
  }

  /**
   * gets all cards back to the stack, shuffles them and saves on firebase.
   */
  refreshStack() {
    this.gameOnLocal.dummyStack = [0, 1, 2, 3, 4];
    this.gameOnLocal.playedCards = [];
    this.gameOnLocal.makeStackFull();
    this.gameOnLocal.shuffle(this.gameOnLocal.stack);
    this.saveGame();
  }

  resetGame() {
    this.gameOnLocal.players = [];
    this.gameOnLocal.avatars = [];
    this.refreshStack();
  }

}