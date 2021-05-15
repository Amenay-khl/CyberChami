import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LignesTAGService {
  private apiTagUrl = 'https://data.mobilites-m.fr/api/lines/json?types=ligne';

  constructor() { }

  // getLignesTag()

}
