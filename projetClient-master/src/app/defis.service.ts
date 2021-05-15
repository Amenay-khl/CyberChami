
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Defi, ArretSelect } from './defintions';

@Injectable({
  providedIn: 'root'
})
export class DefisService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  private subj = new BehaviorSubject<Defi[]>([]);
  readonly observable = this.subj.asObservable();


  private arretSelect = new BehaviorSubject<ArretSelect>({selected:false, arret:""});
  readonly arretSelected = this.arretSelect.asObservable();

  getDefis(): Observable<Defi[]>{
    return this.http.get<Defi[]>(`${this.apiServerUrl}/defis/`);
  }

  getDefi(pseudo: string): Observable<Defi>{
    return this.http.get<Defi>(`${this.apiServerUrl}/defis/${pseudo}`)
  }

  addDefi(Defi: Defi, ref: string): Observable<Defi>{
    return this.http.post<Defi>(`${this.apiServerUrl}/defis/${ref}`,Defi)
  }

  updateDefi(Defi: Defi, ref: string): Observable<Defi>{
    return this.http.put<Defi>(`${this.apiServerUrl}/defis/${ref}`,Defi)
  }
  deleteDefi(pseudo: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/defis/${pseudo}`)
  }

  updatesubj(d:Defi[]){
    this.subj.next(d);
  }

  addDefis(d:Defi){
    const D: Defi[] = this.subj.getValue();
    D.push(d);
    this.subj.next(D);
  }

  updateDefis(d:Defi){
    const D: Defi[] = this.subj.getValue();
    const list:Defi[]=D.filter(x=> x.refDefi !== d.refDefi);
    list.push(d);
    this.subj.next(list);
    console.log(list);
  }

  arretUnselect(){
    this.arretSelect.next({selected:false, arret:""});
  }
  arretselect(arr:string){
    this.arretSelect.next({selected:true, arret:arr});
  }
}

