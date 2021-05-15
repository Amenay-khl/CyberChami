import { SharedService } from 'src/app/shared.service';
import { Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Chami, Defi, Visite, Indice, Reponse, Evaluation } from 'src/app/defintions';
import { DefisService } from 'src/app/defis.service';
import { MesvisitesService } from 'src/app/mesvisites.service';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { V } from '@angular/cdk/keycodes';


export interface Combiner{
  Visite: Visite|null;
  Defi: Defi|null;
  Chami:Chami;
  VisiteEncours: boolean;
}
@Component({
  selector: 'app-visite_en_cours',
  templateUrl: './visite_en_cours.component.html',
  styleUrls: ['./visite_en_cours.component.scss']
})
export class Visite_en_coursComponent implements OnInit {
  chami!: Chami|null;
  visiteEnCours = false;
  obs: Observable<Defi[]>;
  //obsVisite: Observable<Visite[]>;
  obsVisite:Observable<Visite[]>;
  indicesUtilise = '';
  indicesReveles: boolean[] = [];

  listReponse: Reponse[] = [];
  Combine: Observable<Combiner>;
  constructor(private DS: DefisService, private SS: SharedService, private VS: MesvisitesService, private VisuelBar: MatSnackBar) {
    this.getVisites(this.getChami().pseudo);

    this.obsVisite=VS.observable;


    this.visiteEnCours = this.VS.Visiteencours();

    this.obs = DS.observable;
    this.Combine = combineLatest([
      VS.observable.pipe(map( x => x.filter(x1 => x1.status === 'En cours'))),
      this.obs,
      this.SS.Chami
    ]).pipe(
      map(
        ([visites, defis, chami]) => ({
          Visite: visites.length===0 ? null :visites[0], // Et vous êtes sur qu'il y a au loins une visite ??? ca peut fonctionné ca ?
          Defi:  visites.length===0 ? null : (defis.filter(x=> x.refDefi===visites[0].refDefi))[0],
          Chami: chami,
          VisiteEncours: !! visites.find(x => x.status === 'En cours')
        })
      )
    );

    this.Combine.subscribe(x => this.initReponse((x.Defi?.evaluations)));

    this.Combine.subscribe(x=>this.initIndicesReveles((x.Defi?.indices)));

    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.chami = response;
      }
    )
  }

  getdescription(a: string|null): string{
    return a ?? '';
  }

  getVisiteEnCours(): boolean {
    return this.VS.Visiteencours();
  }

  ngOnInit() {
    this.getVisites(this.getChami().pseudo);
  }

  getChami(): Chami{
    if (this.chami != null){
      return this.chami;
    }
    return {pseudo: "null",
      age: -1,
      ville: "null",
      description: "null",
      email: "null"
    } as Chami;
  }

  initReponse(evals: Evaluation[] | undefined): void {
    this.listReponse = [];
    evals?.forEach(e => {
      this.listReponse.push({reponse: ' ', refEvaluation: e.label});
    });
  }

  initIndicesReveles(indice:Indice[] | undefined):void{
    this.indicesReveles = [];
    indice?.forEach(elem =>{
      this.indicesReveles.push(true);
    });
  }


  getVisites(id: string):void {
    this.VS.getVisites(id).subscribe(
      (response: Visite[]) => {
        this.VS.updatesubjall(response);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404){
        }
      }
    );
  }

  revelationIndice(indice:Indice, index:number){
    if (this.indicesReveles[index] === true){
      this.indicesUtilise = this.indicesUtilise.concat(indice.label + ',');
      this.indicesReveles[index] = false;
    }
  }

  termineVisiteA(v: Visite | null): void {
    if (v !== null){
      let visite: Visite = {refDefi: v.refDefi, refVisite: v.refVisite, visiteur: v.visiteur,
      date: v.date, version: '1', mode: v.mode,
      temps: null, status: 'Abandon', indices: '', commentaire: '', reponses: this.listReponse}
      this.VS.updateVisite(visite, visite.refVisite).subscribe(
        (response: Visite) => {
          this.VS.miseajour(response);
          this.VisuelBar.open('Vous avez abandonner', 'Actualise', {
            duration: 2000,
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403){
          }
        }
      );
    }
    this.indicesUtilise = '';
    this.Combine.subscribe(x => this.initReponse((x.Defi?.evaluations)));
    this.Combine.subscribe(x=>this.initIndicesReveles((x.Defi?.indices)));
  }

  termineVisiteT(v: Visite | null): void {
    if (v !== null){
      let visite: Visite = {refDefi: v.refDefi, refVisite: v.refVisite, visiteur: v.visiteur,
      date: v.date, version: '1', mode: v.mode,
        temps: null, status: 'Repondu', indices: this.indicesUtilise.substring(0,this.indicesUtilise.lastIndexOf(',')), commentaire:''  , reponses: this.listReponse}
      console.log(this.listReponse);
      this.VS.updateVisite(visite, visite.refVisite).subscribe(
        (response: Visite) => {
          this.VS.miseajour(response);
          this.VisuelBar.open('Vous avez Repondu', 'Actualise', {
            duration: 2000,
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403){
          }
        }
      );
    }
    this.indicesUtilise = '';
    this.Combine.subscribe(x => this.initReponse((x.Defi?.evaluations)));
    this.Combine.subscribe(x=>this.initIndicesReveles((x.Defi?.indices)));
  }
}
