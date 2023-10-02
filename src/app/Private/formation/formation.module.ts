import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { BurkinaComponent } from './burkina/burkina.component';
import { ExterieurComponent } from './exterieur/exterieur.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedCommonsModule} from "../../../Material/primeng.module";
import {MaterialModule} from "../../../Material/material.module";
import { FicheFormationComponent } from './fiche-formation/fiche-formation.component';
import { FormOrganismeComponent } from './form-organisme/form-organisme.component';
import { GestAgentsComponent } from './gest-agents/gest-agents.component';
import { GestSessionComponent } from './gest-session/gest-session.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { SessionComponent } from './session/session.component';
import { ValidFormaComponent } from './valid-forma/valid-forma.component';
import {AppModule} from "../../../app.module";
import { FormAgentsComponent } from './form-agents/form-agents.component';
import { FormCoutsComponent } from './form-couts/form-couts.component';
import { FormSessionComponent } from './form-session/form-session.component';
import { FormFormationComponent } from './form-formation/form-formation.component';


@NgModule({
  declarations: [
    BurkinaComponent,
    ExterieurComponent,
    FicheFormationComponent,
    FormOrganismeComponent,
    GestAgentsComponent,
    GestSessionComponent,
    OrganismeComponent,
    SessionComponent,
    ValidFormaComponent,
    FormAgentsComponent,
    FormCoutsComponent,
    FormSessionComponent,
    FormFormationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedCommonsModule,
    ReactiveFormsModule,
    FormationRoutingModule,
    //AppModule
  ]
})
export class FormationModule { }
