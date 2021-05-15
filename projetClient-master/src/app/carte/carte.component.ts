import { Component, OnInit } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import {Feature as GeoJSONFeature} from 'geojson'; // Vous avez la bibliothèque geojson
import { Observable, from, combineLatest } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DefisService } from '../defis.service';
import { Arret, Defi, ArretSelect } from '../defintions';

// Le typage (approcimatif ?) des données du site de la METRO obtenues sur :
// https://data.metromobilite.fr/api/lines/json?types=ligne&codes=SEM_C1
export type GeoPoint = number[];
export interface GeometryMultiLineString {
  type: 'MultiLineString';
  coordinates: GeoPoint[][];
}

export interface FeatureLigneCollection {
  type: 'FeatureCollection';
  features: FeatureLigne[];
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
    coordinates: GeoPoint
  };
}

export interface FeatureLigne {
  type: 'Feature';
  geometry: GeometryMultiLineString;
  properties: {
    CODE: string; // "SEM_C1"
    COULEUR: string; // "253,234,0"
    COULEUR_TEXTE: string; // "0,0,0"
    LIBELLE: string; // "GRENOBLE Cité Jean Macé / MEYLAN Maupertuis"
    NUMERO: string; // "C1"
    PMR: number; // 1
    ZONES_ARRET: string[];
    id: string; // "SEM_C1"
    type: string; // "ligne" 'arret'
  };
}

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})

export class CarteComponent implements OnInit {
  readonly lignes = this.toutesLesLignes();
  readonly arrets = this.toutesLesArrets();
  arret=new Set<string>();
  arretCourant:string="";

  tileLayerUrl = OSM_TILE_LAYER_URL;
  readonly iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  readonly iconMarkerSelected='https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';
  obs: Observable<Defi[]>;
  combine:Observable<Arret[]>;

  constructor(private http: HttpClient,private ds: DefisService) {
    this.obs= ds.observable;
    this.combine=combineLatest([this.obs,this.arrets]).pipe(
      map(x=> [... new Set (x[0].map(arr=>arr.arret)) ].map(e=>({arret:e, coord:x[1].features.find(e1=>e1.properties.LIBELLE===e)?.geometry.coordinates} as Arret))
        )
    );

  }


  selected(arret:string){
    if (this.arretCourant!==arret){
      this.ds.arretselect(arret);
      this.arretCourant=arret;}
    else{
      this.ds.arretUnselect();
      this.arretCourant="";
    }
  }
  afficheobs(){
    this.combine.subscribe(x=>console.log(x));
  }

  recherche(a:Arret){
    console.log(a);
  }
  rech(){
    console.log("perte");
  }
  private toutesLesLignes(): Observable<FeatureLigne[]> {
    return this.http.get<FeatureLigneCollection>('https://data.metromobilite.fr/api/lines/json?types=ligne').pipe(
      map( fc => fc.features.filter( f => f.geometry?.type === 'MultiLineString' ) ),
      share()
    );
  }

  private toutesLesArrets(): Observable<FeatureArretCollection> {
    return this.http.get<FeatureArretCollection>('https://data.mobilites-m.fr/api/bbox/json?types=arret').pipe(
      share()
    );
  }


  ngOnInit(): void {
  }

}
