import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Defi, Chami} from '../defintions';

@Component({
  selector: 'app-mes-defis',
  templateUrl: './mes-defis.component.html',
  styleUrls: ['./mes-defis.component.scss']
})
export class MesDefisComponent implements OnInit {

  chamiId!: string;

  constructor(private SS: SharedService) {
    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.chamiId = response.pseudo;
      }
    )
  }

  ngOnInit(): void {
  }

}
