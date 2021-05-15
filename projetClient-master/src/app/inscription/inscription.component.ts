import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Chami } from '../defintions';
import { ChamisService } from '../chamis.service';
import firebase from 'firebase/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})


export class InscriptionComponent implements OnInit {
  profileForm = new FormGroup({
    age: new FormControl('',Validators.required),
    ville: new FormControl(''),
  });
  @Input() chamiId!:firebase.User | null;
  @Output() valeur = new EventEmitter<boolean>();

  @ViewChild("age") age!: ElementRef<HTMLInputElement>;

  MaDescription:string|null=null;
  constructor(private chamiService: ChamisService, private SS: SharedService) { }



  ngOnInit(): void {
  }


  get pseudo(){
    return this.chamiId?.displayName ?? '';
  }
  //email
  get email(){
    return this.chamiId?.email ?? '';
  }

  addChami(age:string,descr:string,ville:string){
    let a= parseInt(age);
    console.log(a);
    this.chamiService.addChami({pseudo:this.pseudo,age:a,ville:ville,description:descr,email:this.email}).subscribe(
      (response: Chami) => {
        console.log("trouvé");
        this.SS.updateChami(response);
        this.valeur.emit(true);
      },
      (error: HttpErrorResponse) => {
        if(error.status===403){
          console.log("creation rater");
        }
      }
    )
  }


}

