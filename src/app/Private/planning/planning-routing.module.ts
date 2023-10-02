import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlanningComponent} from "./planning.component";
import {SalleComponent} from "./salle/salle.component";

const routes: Routes = [
  {path: 'planning', component: PlanningComponent},
  {path: 'salle', component: SalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
