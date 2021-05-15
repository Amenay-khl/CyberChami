import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @Input() chami!: null | firebase.User;

  constructor() { }

  ngOnInit(): void {
  }

}
