import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { SharedFormationModule } from './shared-formation/shared-formation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormationRoutingModule,
    PublicModule,
    PrivateModule,
    SharedFormationModule
  ]
})
export class FormationModule { }
