import { SharedService } from './../shared.service';
import { Evaluation } from './../defintions';
import { DefisComponent } from './../defis/defis.component';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, Inject, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Defi, Indice, MotCles, Chami } from '../defintions';
import { DefisService } from '../defis.service';
import firebase from 'firebase/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  defi = {} as Defi;

  chamiId!: string;
  @Input() defiImport!: Defi;

  ToutDefi=new BehaviorSubject<Defi[]>([]);

  constructor(private SS: SharedService, private defisService: DefisService, public dialog: MatDialog, private VisuelBar: MatSnackBar) {

    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.chamiId = response.pseudo;
      }
    )
    this.defisService.getDefis().subscribe(
      (response: Defi[]) => {
        this.ToutDefi.next(response);
      });


    console.log('chamiformulaire:' + this.chamiId);
   }

  ngOnInit(): void {
  }

  getPseudo(): string {
    return this.chamiId;
  }

  getRefDefiValid(): string {
    let ref;
    let maxref = 0;
    this.defisService.getDefis().subscribe(
      (response: Defi[]) => {
        this.ToutDefi.next(response);
        //this.defisService.updatesubj(response);
      });

      this.ToutDefi.forEach(defis => {
      defis.forEach(defi => {
        ref = parseInt(defi.refDefi.substr(1));
        if (ref > maxref) {
          maxref = ref;
        }
      });

    });
    maxref = maxref + 1;
    if (maxref < 10) {
      return 'D00' + maxref;
    }
    if (maxref < 100) {
      return 'D0' + maxref;
    }
    return 'D' + maxref;

  }

  openNewForm(): void {
    const dialogRef = this.dialog.open(FormulairePopUp, {
      width: '900px',
      data: {
        refDefi: this.defi.refDefi = 'D000',
        titre: this.defi.titre,
        auteur: this.chamiId ?? '',
        date: new Date(),
        description: this.defi.description,
        type: this.defi.type,
        dateModif: new Date(),
        distanciel: this.defi.distanciel,
        mode: this.defi.mode = 'presentiel',
        arret: this.defi.arret,
        motsCles: [],
        points: this.defi.points,
        duree: this.defi.duree,
        indices: [],
        evaluations: [],
        epilogue: this.defi.epilogue,
        materiels: this.defi.materiels,
        commentaire: this.defi.commentaire,
        prologue: this.defi.prologue,
        statut: 'disponible'
      }
    });
    //ajoute un defi
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined){
        result.refDefi = this.getRefDefiValid();
        this.defisService.addDefi(result, result.refDefi).subscribe(
          (response: Defi) => {
            this.defisService.addDefis(response);
            console.log("1");
            this.defisService.observable.subscribe(x=>console.log(x));
            this.VisuelBar.open('Le defi a bien été crée', 'Actualise', {
              duration: 2000,
            });
            //this.actu.detectChanges();
            console.log("2");
            this.defisService.observable.subscribe(x=>console.log(x));
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403){
              console.log('defi annulé');
            }
          }
        );
      }
    });
  }


  openEditedForm(): void {
    const dialogRef = this.dialog.open(FormulairePopUp, {
      width: '900px',
      data: {
        refDefi: this.defiImport.refDefi,
        titre: this.defiImport.titre,
        auteur: this.chamiId ?? '',
        date: this.defiImport.date,
        description: this.defiImport.description,
        type: this.defiImport.type,
        dateModif: new Date(),
        distanciel: this.defiImport.distanciel,
        mode: this.defiImport.mode = 'presentiel',
        arret: this.defiImport.arret,
        motsCles: this.defiImport.motsCles,
        points: this.defiImport.points,
        duree: this.defiImport.duree,
        statut: 'disponible',
        evaluations: this.defiImport.evaluations,
        indices: this.defiImport.indices,
        epilogue: this.defiImport.epilogue,
        materiels: this.defiImport.materiels,
        commentaire: this.defiImport.commentaire,
        prologue: this.defiImport.prologue,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined){
        this.defisService.updateDefi(result, result.refDefi).subscribe(
          (response: Defi) => {
            this.defisService.updateDefis(response);
            this.VisuelBar.open('Le defi a bien été édité', 'Actualise', {
              duration: 2000,
            });

          },
          (error: HttpErrorResponse) => {
            if(error.status === 403){
              console.log('defi non modifié');
            }
          }
        );
      }
    });
  }
}

export interface FeatureArretCollection {
  type: 'FeatureCollection';
  features: FeatureArret[];
}
export interface FeatureArret {
  type: 'Feature';
  properties: {
    CODE: string; // "SEM_C1"
    LIBELLE: string; // "GRENOBLE Cité Jean Macé / MEYLAN Maupertuis"
    type: 'arret';
    COMMUNE: string;
    arr_visible: '1'|'0';
    id: string;
    epci: any;
  };
  description: string;
  geometry: {
    type: 'Point';
    coordinates: [number,number]
  };
}


@Component({
  selector: 'formulairepopup',
  templateUrl: 'formulairepopup.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulairePopUp implements OnInit{
  arretOptions = this.toutesLesArrets() ;
  typeOptions: string[] = ['Enigme', 'Challenge'];
  typeEvals: string[] = ['Question', 'Photo'];
  page = false;
  indiceVide: Indice = {label: '', description: '', points: null};
  evalVide: Evaluation = {label: '', description: '', bonneReponse: '', points: null, type: 'Question'};
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myControl = new FormControl();


  constructor(
    public dialogRef: MatDialogRef<FormulairePopUp>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public defi: Defi) {
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  private toutesLesArrets(): Observable<FeatureArret[]> {
    return this.http.get<FeatureArretCollection>('https://data.mobilites-m.fr/api/bbox/json?types=arret').pipe(
      // tap( console.log ), // Pour voir dans la console
      // map(fc => fc.features.filter(a=>a.properties.COMMUNE==='GRENOBLE')),
      map(fc => fc.features),
      share() // Observable cold => hot, on ne réplique pas la chaine de transfo pipe quand on s'abonne
    );
  }

  ajouteListeMotsCles(event: MatChipInputEvent, liste: MotCles[]): void {
    if ((event.value || '').trim()) {
      liste.push({ label: event.value.trim() });
    }
    event.input.value = '';
  }

  ajouteListeIndice(liste: Indice[]): void {
    this.indiceVide.label = 'I' + (liste.length + 1);
    if ((this.indiceVide.description !== '')) {
      liste.push({label: this.indiceVide.label, description: this.indiceVide.description, points: this.indiceVide.points});
    }
    this.indiceVide.description = '';
    this.indiceVide.points = null;
  }

  compteQuestion(liste: Evaluation[]): number {
    let nb = 0;
    liste.forEach(element => {
      if (element.type === 'Question'){
        nb = nb + 1;
      }
    });
    return nb;
  }

  ajouteListeEval(liste: Evaluation[]): void {
    if (this.evalVide.type === 'Question'){
      this.evalVide.label = 'Q' + (this.compteQuestion(liste) + 1);
      if ((this.evalVide.description !== '' && this.evalVide.bonneReponse !== '')) {
        liste.push({label: this.evalVide.label, description: this.evalVide.description, bonneReponse: this.evalVide.bonneReponse,
          points: this.evalVide.points, type: this.evalVide.type});
      }
    }
    else{
      this.evalVide.label = 'P' + ((liste.length - this.compteQuestion(liste)) + 1);
      if ((this.evalVide.description !== '')) {
        liste.push({label: this.evalVide.label, description: this.evalVide.description, bonneReponse: '',
          points: this.evalVide.points, type: this.evalVide.type});
      }
    }
    this.evalVide.description = '';
    this.evalVide.bonneReponse = '';
    this.evalVide.points = null;
  }

  delListeMotsCles(mot: MotCles, liste: MotCles[]): void {
    const index = liste.indexOf(mot);

    if (index >= 0) {
      liste.splice(index, 1);
    }
  }

  delListeIndice(indice: Indice, liste: Indice[]): void {
    const index = liste.indexOf(indice);
    if (index >= 0) {
      liste.splice(index, 1);
    }
    let index2 = 0;
    liste.forEach(element => {
      element.label = 'I' + (index2 + 1);
      index2++;
    });
  }

  delListeEval(evaluation: Evaluation, liste: Evaluation[]): void {
    const index = liste.indexOf(evaluation);
    if (index >= 0) {
      liste.splice(index, 1);
    }
    let indexQ = 0;
    let indexP = 0;
    liste.forEach(element => {
      if (element.type === 'Question'){
        element.label = 'Q' + (indexQ + 1);
        indexQ++;
      }
      else{
        element.label = 'P' + (indexP + 1);
        indexP++;
      }
    });
  }


}
