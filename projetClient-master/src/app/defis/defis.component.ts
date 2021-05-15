import { SharedService } from './../shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable} from 'rxjs';
import firebase from 'firebase/app';
import { Defi, Visite, Chami} from '../defintions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefisService} from '../defis.service';
import { MesvisitesService } from './../mesvisites.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface dataPopUp {
  mode: string;
  def: Defi;
}

@Component({
  selector: 'app-defis',
  templateUrl: './defis.component.html',
  styleUrls: ['./defis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DefisComponent implements OnInit {
  visite!: Visite;
  colonne: string[] = ['refDefi', 'auteur', 'titre', 'type', 'arret'];
  defis!: Defi[];
  deficomplet!: Defi | null;
  chamiId!: string;
  @Input() StylePage!: number;
  mode: string[] = ['presentiel', 'distanciel'];
  obs: Observable<Defi[]>;
  union: Observable<Defi[]>;


  constructor(public dialog: MatDialog, private SS: SharedService,
              private defisService: DefisService, private visitesService: MesvisitesService, private VisuelBar: MatSnackBar) {
    this.obs = this.defisService.observable;

    //this.getVisites(this.getPseudo());
    SS.Chami.subscribe(x=>this.getVisites(x.pseudo));
    this.union = combineLatest([this.obs, this.defisService.arretSelected]).pipe(
          map(x => x[0].filter(x0 => x0.arret === x[1].arret || this.StylePage === 1 &&
            x[1].selected === false  || this.StylePage === 2 && x0.auteur === this.chamiId))
    );
    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.chamiId = response.pseudo;
      }
    )
  }


  creeVisite(defi: Defi): void {
    if (this.visitesService.Visiteencours() === false){
      const dialogRef = this.dialog.open(PopupValidationVisite, {
        width: '250px',
        data: {mode: 'presentiel', def: defi}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          this.visite = {refDefi: result.def.refDefi, refVisite: 'V000', visiteur: this.getPseudo(),
              date: new Date(), version: '1', mode: result.mode,
              temps: null, status: 'En cours', indices: '', commentaire: '', reponses: []};

          this.visitesService.addVisite(this.visite, this.visite.refVisite).subscribe(
            (response: Visite) => {
              this.VisuelBar.open('Vous venez de cree une viste', 'Actualise', { duration: 2000 });
              this.visitesService.getVisites(this.getPseudo()).subscribe(
                (response1: Visite[]) => {
                  this.visitesService.updatesubjall(response1) }
              );

              //this.visitesService.observable.subscribe(a=> console.log("okkkkpice"+ a))
              //mettre a jour visite
            },
            (error: HttpErrorResponse) => {
              this.VisuelBar.open('Un probleme est survenu', 'Veuillez Patienté', { duration: 2000 });
            }
          );
        }
      });
    }
    else {
      this.VisuelBar.open('Vous avez deja une visite, terminer la avant de pouvoir en choisir une nouvelle',
      'Impossible de cree une visite', { duration: 2000 });
    }
  }

  ngOnInit(): void {
    this.getDefis();
  }

  getPseudo(): string {
    return this.chamiId ?? '';
  }

  getobs(): Observable<Chami> {
    return this.SS.Chami;
  }

  trie(liste: Defi[]): Defi[] {
    const listetrie: Defi[] = liste.sort((n1, n2) => {
      if (n1.refDefi > n2.refDefi) { return 1; }
      if (n1.refDefi < n2.refDefi) { return -1; }
      return 0;
    });
    return listetrie;
  }

  trieChamis(liste: Defi[]): Defi[] {
    const newdefis: Defi[] = [];
    liste.forEach(element => {
      if (element.auteur === this.chamiId){ newdefis.push(element); }
    });
    return newdefis;
  }

  getDefis(): void {
    this.defisService.getDefis().subscribe(
      (response: Defi[]) => {
        if (this.StylePage === 2){ this.defis = this.trieChamis(response); this.defis = this.trie(this.defis); }
        else{ this.defis = this.trie(response); }
        this.defisService.updatesubj(this.defis);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getVisites(id: string): void {
    this.visitesService.getVisites(id).subscribe(
      (response: Visite[]) => {
        this.visitesService.updatesubjall(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}


@Component({
  selector: 'ValidationVisite',
  templateUrl: 'ValidationVisite.html',
})
export class PopupValidationVisite {

  constructor(
    public dialogRef: MatDialogRef<PopupValidationVisite>,
    @Inject(MAT_DIALOG_DATA) public data: dataPopUp) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

