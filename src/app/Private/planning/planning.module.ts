import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { SalleComponent } from './salle/salle.component';
import { FormSalleComponent } from './salle/form-salle/form-salle.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedCommonsModule} from "../../../Material/primeng.module";
import {MaterialModule} from "../../../Material/material.module";
import { MotifComponent } from './salle/motif/motif.component';
import {AppModule} from "../../../app.module";
import { ValidPlanningComponent } from './valid-planning/valid-planning.component';
import { PlanningFormComponent } from './planning-form/planning-form.component';


@NgModule({
  declarations: [
    SalleComponent,
    FormSalleComponent,
    MotifComponent,
    ValidPlanningComponent,
    PlanningFormComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedCommonsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    PlanningRoutingModule,
   // AppModule
  ]
})
export class PlanningModule { }
