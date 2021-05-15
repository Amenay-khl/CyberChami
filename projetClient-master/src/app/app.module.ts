import { MediaComponent } from './media/media.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatMenuModule} from '@angular/material/menu';
import { YagaModule } from '@yaga/leaflet-ng2';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { ChamisComponent } from './chamis/chamis.component';
import { DefisComponent, PopupValidationVisite } from './defis/defis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { CarteComponent } from './carte/carte.component';
import { FormulaireComponent, FormulairePopUp } from './formulaire/formulaire.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTableModule} from '@angular/material/table';
import { MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfoChamisComponent } from './info-chamis/info-chamis.component';
import { Visite_en_coursComponent } from './visite_en_cours/visite_en_cours/visite_en_cours.component';
import { MesVisitesComponent } from './mes-visites/mes-visites.component';
import { MainViewComponent } from './main-view/main-view.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { MesDefisComponent } from './mes-defis/mes-defis.component';


@NgModule({
  declarations: [
    AppComponent,
    ChamisComponent,
    DefisComponent,
    InscriptionComponent,
    FormulaireComponent,
    FormulairePopUp,
    PopupValidationVisite,
    CarteComponent,
    InfoChamisComponent,
    Visite_en_coursComponent,
    MesVisitesComponent,
    MainViewComponent,
    MediaComponent,
    MesDefisComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatChipsModule,
    HttpClientModule,
    MatListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    YagaModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
