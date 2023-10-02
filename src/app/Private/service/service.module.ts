import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { DirectionComponent } from './direction/direction.component';
import { DepartementComponent } from './departement/departement.component';
import { EntiteComponent } from './direction/entite/entite.component';
import { SousEntiteComponent } from './departement/sous-entite/sous-entite.component';
import {MaterialModule} from "../../../Material/material.module";
import {SharedCommonsModule} from "../../../Material/primeng.module";
import { ReactiveFormsModule } from '@angular/forms';
import {AppModule} from "../../../app.module";
import { ValidServiceComponent } from './valid-service/valid-service.component';


@NgModule({
  declarations: [
    DirectionComponent,
    DepartementComponent,
    EntiteComponent,
    SousEntiteComponent,
    ValidServiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedCommonsModule,
    ServiceRoutingModule,
   // AppModule
  ]
})
export class ServiceModule { }
