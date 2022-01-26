import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  /**
   * By clicking btn START on start-screen,
   * generates a new Game with players, stack of cards,etc. on local.
   * generates a collection naming games on Firebase and add new Game into it.
   * and then navigate the page to /game/id.
   */
  startGame() {
    let gameForFirebase = new Game();
    this.firestore
      .collection('games')
      .add(gameForFirebase.toJSON())
      .then((gameInfo) => {
        this.router.navigateByUrl('/game/' + gameInfo.id)
      });
  }

}

