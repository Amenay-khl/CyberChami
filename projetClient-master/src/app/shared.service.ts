import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chami } from './defintions';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subj = new BehaviorSubject<Chami>({pseudo: 'Anonyme',
      age: 0,
      ville: 'Grenoble',
      description: '',
      email: ''
  });
  readonly Chami = this.subj.asObservable();

  constructor() { }

  updateChami(Chami:Chami){
    this.subj.next(Chami);
  }
}
