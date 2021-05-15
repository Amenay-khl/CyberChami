import { SharedService } from './../shared.service';
import { Chami } from './../defintions';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';
import { ChamisService } from '../chamis.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-info-chamis',
  templateUrl: './info-chamis.component.html',
  styleUrls: ['./info-chamis.component.scss']
})
export class InfoChamisComponent implements OnInit {
  isEditing=false;
  isEditing1=false;
  isEditing2=false;


  Chami!: Chami|null;

  getChami():Chami{
    if(this.Chami !=null){
      return this.Chami;
    }
    return {pseudo: "null",
      age: -1,
      ville:"null",
      description:"null",
      email:"null"
      };
    }

  @ViewChild("age") age!: ElementRef<HTMLInputElement>;
  obs: Observable<Chami>;
  constructor(private chamiService: ChamisService, private SS:SharedService) {
    this.obs=this.SS.Chami;
    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.Chami = response;
      }
    )
  }

  ngOnInit(): void {

  }

  newAge(age:string){
    let a= parseInt(age);
    if (this.Chami!=null){
      this.Chami.age=a;}
    this.updateProfil();
  }
  updateProfil(){
    this.chamiService.updateChami(this.getChami()).subscribe(
      () => {
        console.log("Chami M-a-j");
      },
      (error: HttpErrorResponse) => {
        if(error.status===403){
          console.log("creation rater");
        }
      }
    )
  }

}
