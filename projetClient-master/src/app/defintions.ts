import { Time } from "@angular/common";

export interface Chami {
  pseudo: string;
  age: number;
  ville: string;
  description: string;
  email: string;
}

export interface Defi {
  refDefi: string;
  titre: string;
  auteur: string;
  date: Date;
  description: string;
  type: string;
  dateModif: Date;
  distanciel: string;
  mode: string;
  arret: string;
  motsCles: MotCles[];
  points: number;
  duree: string;
  indices: Indice[];
  evaluations: Evaluation[];
  epilogue: string;
  statut: string;
  materiels: string;
  commentaire: string;
  prologue: string;
}

export interface Indice {
  label: string;
  description: string;
  points: number | null;
}

export interface Evaluation {
  label: string;
  description: string;
  bonneReponse: string;
  points: number | null;
  type: string;
}

export interface MotCles {
  label: string;
}

export interface Reponse {
  reponse: string | null;
  refEvaluation: string;
}

export interface Visite {
  refVisite: string;
  refDefi: string;
  visiteur: string;
  date: Date;
  version: string;
  mode: string;
  temps: number | null;
  status: string;
  indices: string;
  commentaire: string;
  reponses: Reponse[];
}

export type GeoPoint = number[];

export interface Arret {
  arret:string,
  coord:GeoPoint;
}
export interface ArretSelect {
  selected:boolean,
  arret:string
}
