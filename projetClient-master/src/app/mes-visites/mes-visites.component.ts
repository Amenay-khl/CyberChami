import { SharedService } from './../shared.service';
import { Chami, Defi, Visite } from './../defintions';
import { MesvisitesService } from './../mesvisites.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DefisService } from '../defis.service';



type FctFilter = (vs: Visite) => boolean;



@Component({
  selector: 'app-mes-visites',
  templateUrl: './mes-visites.component.html',
  styleUrls: ['./mes-visites.component.scss']
})

export class MesVisitesComponent implements OnInit {
  displayedColumns: string[] = [
    "refVisite",
    "refDefi",
    "date",
    "mode",
    "temps",
    "status",
    "indices",
    "commentaire"
  ];
  obs: Observable<Defi[]>;
  Chami!: Chami | null;
  obs1: Observable<Chami>;
  Visites: Observable<Visite[]>

  readonly fAll: FctFilter = () => true;
  readonly fAband: FctFilter = (vs) => vs.status === "Abandon";
  readonly fRepondu: FctFilter = (vs) => vs.status === "Repondu";
  readonly fEnCours: FctFilter = (vs) => vs.status === "En cours";
  f: FctFilter = this.fAll;

  constructor(private MesvisitesService: MesvisitesService, private ds: DefisService, private SS: SharedService) {
    this.obs = ds.observable;
    this.Visites = MesvisitesService.observable;
    this.obs1 = this.SS.Chami;
    this.SS.Chami.subscribe(
      (response: Chami) => {
        this.Chami = response;
      }
    );
    this.ds.getDefis().subscribe(
      (response: Defi[]) => {
        this.ds.updatesubj(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  ngOnInit(): void {
    this.getVisites(this.getChami().pseudo);

  }

  getVisites(id: string): void {
    this.MesvisitesService.getVisites(id).subscribe(
      (response: Visite[]) => {
        this.MesvisitesService.updatesubjall(response);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('compteInexistant');
        }
      }
    )
  }

  monDefi(ref: string) {
    let defis!: Defi;
    this.obs = this.ds.observable;
    this.obs.subscribe(defi => defis = defi.find(d => d.refDefi === ref)!);
    return defis;
  }

  getChami(): Chami {
    if (this.Chami != null) {
      return this.Chami;
    }
    return {
      pseudo: "null",
      age: -1,
      ville: "null",
      description: "null",
      email: "null"
    };
  }
}
