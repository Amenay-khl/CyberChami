import { SharedService } from './shared.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChamisService } from './chamis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Chami } from './defintions';

interface STATE_COMPO_APP {
  readonly chami: null | firebase.User;
  readonly isLoggedIn: boolean;
  readonly photoURL: string;
}
interface inscrit{
  readonly estInscrit: boolean;
}
interface Combine extends STATE_COMPO_APP {
  readonly estInscrit: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  readonly dataIconGoogle = 'assets/images/iconGoogle.png';
  readonly dataIconCyberChamis = 'assets/images/logoCyberChamis.png';
  readonly stateObs: Observable<STATE_COMPO_APP>;
  readonly estInscrit = new BehaviorSubject<inscrit>({estInscrit: true});
  pseudo = '';
  page = 0;
  chamis = new BehaviorSubject<Chami>({pseudo: 'Annonyme',
    age: 0,
    ville: 'Grenoble',
    description: '',
    email: ''
});

  combine: Observable<Combine>;

  constructor(public auth: AngularFireAuth, private US: ChamisService, private SS: SharedService) {
    this.stateObs = auth.user.pipe(
      map( u => ({
        chami: u,
        isLoggedIn: u !== null,
        photoURL: u?.photoURL ?? ''
      }))
    );
    this.stateObs.subscribe(obs => {obs.isLoggedIn && this.isRegistred(obs.chami) ? this.page = 1 : this.page = 0; });

    this.combine = combineLatest([this.stateObs, this.estInscrit]).pipe(
      map(a => ({ ...a[0], ...a[1]}))
    );
  }

  getPseudo(chami: firebase.User | null): string {
    return chami?.displayName ?? '';
  }

  ngOnInit(){
  }

  // Connection d'un utilisateur (chamis)
  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
    this.stateObs.subscribe(obs => {this.isRegistred(obs.chami); });
  }

  // Deconnection d'un utilisateur (chamis)
  logout(): void {
      this.auth.signOut();
      this.estInscrit.next({estInscrit: false});
      this.page = 0;
  }

  // (response: Defi[]) dans les parenthèse
  isRegistred(chami: firebase.User |null): void {
    if (chami != null){
      const id = chami?.displayName ?? '';
      this.pseudo = id;
      this.US.getChami(id).subscribe(
      (response: Chami) => {
        this.SS.updateChami(response);
        this.chamis.next(response);
        this.page = 1;
        this.estInscrit.next({estInscrit: true});
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404){
          console.log('Aucun compte du nom de ' + id + ' existe.');
          this.estInscrit.next({estInscrit: false});
        }
      });
    }
  }

  maj(b: boolean){
    this.estInscrit.next({estInscrit: b});

    this.page = 1;
  }

}
