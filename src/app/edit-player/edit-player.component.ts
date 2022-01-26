import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  @Input() avatar: any;

  allAvatars = [
    'Blue-Sky.jpg',
    'Clip-Art.png',
    'Hangover.jpg',
    'Leonorah-Beverly.jpg',
    'Linux.jpg',
    'Lonely-Future.jpg',
    'Naruto.png',
    'Ocean-Woman.jpg',
  ]

  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }
  
  onNoClick(){
    this.dialogRef.close();
  }
}
