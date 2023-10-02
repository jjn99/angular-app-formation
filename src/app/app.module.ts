import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TokenInterceptorInterceptor } from './core/Interceptors/token-interceptor.interceptor';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin.module';
import { StageModule } from './stage/stage.module';
import { FormationModule } from './formation/formation.module';



@NgModule({
  declarations: [
    AppComponent,
    FullCalendarModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedCommonsModule,
    FullCalendarModule,
    AppRoutingModule,
    //KeycloakAngularModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    CoreModule,
    SharedModule,
    AdminModule,
    StageModule,
    FormationModule
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
