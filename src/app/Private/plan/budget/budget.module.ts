import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { DirectionComponent } from './direction/direction.component';
import { DepartementComponent } from './departement/departement.component';
import { BudgetEntiteComponent } from './direction/budget-entite/budget-entite.component';
import { BudgetSousEntiteComponent } from './departement/budget-sous-entite/budget-sous-entite.component';
import {SharedCommonsModule} from "../../../../Material/primeng.module";
import {MaterialModule} from "../../../../Material/material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ValidBudgetComponent } from './valid-budget/valid-budget.component';


@NgModule({
  declarations: [
    DirectionComponent,
    DepartementComponent,
    BudgetEntiteComponent,
    BudgetSousEntiteComponent,
    ValidBudgetComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedCommonsModule,
    ReactiveFormsModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
