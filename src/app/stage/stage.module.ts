import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StageRoutingModule } from './stage-routing.module';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { SharedStageModule } from './shared-stage/shared-stage.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StageRoutingModule,
    PrivateModule,
    PublicModule,
    SharedStageModule
  ]
})
export class StageModule { }
