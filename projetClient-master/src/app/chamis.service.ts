import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chami } from './defintions';
import { flatMap } from 'rxjs/operators';

type OP = 'GET' | 'POST' | 'DELETE' | 'UPDATE';
@Injectable({
  providedIn: 'root'
})
export class ChamisService {
  private apiServerUrl =environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  private async queryHTTP<T>(method: OP, url: string, body?: string): Promise<T> {
    const R = await fetch(url, {
      method,
      body
    });
    return await R.json() as T;
  }

  getChamis(): Observable<Chami[]> {
    return this.http.get<Chami[]>(`${this.apiServerUrl}/chamis/`, {
    });
  }

  getChami(pseudo: string): Observable<Chami>{
    return this.http.get<Chami>(`${this.apiServerUrl}/chamis/${pseudo}`);
  }

  addChami(chami: Partial<Chami>): Observable<Chami>{
    return this.http.post<Chami>(`${this.apiServerUrl}/chamis/${chami.pseudo}`, chami);
  }

  updateChami(chami: Chami): Observable<Chami>{
    return this.http.put<Chami>(`${this.apiServerUrl}/chamis/${chami.pseudo}`, chami);
  }

  deleteChami(pseudo: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/chamis/${pseudo}`);
  }
}
