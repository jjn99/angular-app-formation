import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanFormationComponent } from './plan-formation/plan-formation.component';
import { FraisComponent } from './frais/frais.component';
import { BudgetComponent } from './budget/budget.component';
import { FraisMissionComponent } from './frais/frais-mission/frais-mission.component';
import {SharedCommonsModule} from "../../../Material/primeng.module";
import {MaterialModule} from "../../../Material/material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ValidPlanComponent } from './valid-plan/valid-plan.component';


@NgModule({
  declarations: [
    PlanFormationComponent,
    FraisComponent,
    BudgetComponent,
    FraisMissionComponent,
    ValidPlanComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedCommonsModule,
    ReactiveFormsModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }
