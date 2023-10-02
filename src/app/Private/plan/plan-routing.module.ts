import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlanFormationComponent} from "./plan-formation/plan-formation.component";
import {FraisComponent} from "./frais/frais.component";

const routes: Routes = [
  {path: 'plan', component: PlanFormationComponent},
  {path: 'frais', component: FraisComponent},
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
