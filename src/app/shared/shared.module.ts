import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormValidationsComponent } from './components/form-validations/form-validations.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./Material/material.module";
import {SharedCommonsModule} from "./Material/primeng.module";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    FormValidationsComponent,
    ErrorPageComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedCommonsModule
  ],
  export:[
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MaterialModule,
      SharedCommonsModule
      ]
})
export class SharedModule { }
