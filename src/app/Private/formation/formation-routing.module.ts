import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExterieurComponent} from "./exterieur/exterieur.component";
import {FormationComponent} from "./formation.component";
import { FormFormationComponent } from './form-formation/form-formation.component';
import { FormSessionComponent } from './form-session/form-session.component';
import { FormAgentsComponent } from './form-agents/form-agents.component';
import { FormCoutsComponent } from './form-couts/form-couts.component';

const routes: Routes = [
  {path: 'formations', component: FormationComponent},
  {path: 'formulaire', component: ExterieurComponent,
  children: [
    {path:'formationForm',component: FormFormationComponent},
    {path:'session',component: FormSessionComponent},
    {path: 'agent', component: FormAgentsComponent},
    {path: 'couts', component: FormCoutsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
