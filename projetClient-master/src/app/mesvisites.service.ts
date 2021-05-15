import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Visite } from './defintions';

@Injectable({
  providedIn: 'root'
})
export class MesvisitesService {

  constructor(private http: HttpClient) { }
  private apiServerUrl = environment.apiBaseUrl;

  private subj = new BehaviorSubject<Visite[]>([]);
  readonly observable = this.subj.asObservable();


  private subjTouteMesVisite= new BehaviorSubject<Visite[]>([]);
  readonly observableMesVisites = this.subjTouteMesVisite.asObservable();

  getVisites(pseudo: string): Observable<Visite[]>{
    return this.http.get<Visite[]>(`${this.apiServerUrl}/visites/${pseudo}`);
  }

  addVisite(visite: Visite, ref: string): Observable<Visite>{
    return this.http.post<Visite>(`${this.apiServerUrl}/visites/${ref}`, visite);
  }

  updateVisite(visite: Visite, ref: string): Observable<Visite>{
    return this.http.put<Visite>(`${this.apiServerUrl}/visites/${ref}`, visite);
  }

  updatesubj(d: Visite){
    const Visite: Visite[] = this.subj.getValue();
    Visite.push(d);
    this.subj.next(Visite);

  }
  updatesubjall(d: Visite[]){
    this.subj.next(d);
  }
  Visiteencours(): boolean{
    const Visite: Visite[] = this.subj.getValue();
    return !! Visite.find(x => x.status === 'En cours');
  }

  miseajour(v:Visite){
    const Visite: Visite[] = this.subj.getValue();
    const list:Visite[]=Visite.filter(x=> x.refVisite !== v.refVisite);
    list.push(v);
    this.subj.next(list);
  }
  updateTouteMesVisite(v:Visite[]){
    this.subjTouteMesVisite.next(v);
  }
}
