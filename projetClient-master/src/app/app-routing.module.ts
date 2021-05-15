import { ChamisComponent } from './chamis/chamis.component';
import { MesVisitesComponent } from './mes-visites/mes-visites.component';
import { InfoChamisComponent } from './info-chamis/info-chamis.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesDefisComponent } from './mes-defis/mes-defis.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'MonCompte', component: InfoChamisComponent},
  {path: 'MesVisites', component: MesVisitesComponent},
  {path: 'MesDefis', component: MesDefisComponent},
  {path: 'Communauté', component: ChamisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
