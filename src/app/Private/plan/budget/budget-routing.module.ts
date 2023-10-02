import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DirectionComponent} from "./direction/direction.component";
import {DepartementComponent} from "./departement/departement.component";

const routes: Routes = [
  {path: 'direction', component: DirectionComponent},
  {path: 'departement', component: DepartementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
