import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'header', component: HeaderComponent },
      { path: 'sidenav', component: SidenavComponent },
      { path: 'body', component: BodyComponent },
      {path: 'statistique',
        component: StatisticsComponent,/*canActivate: {AuthGuard},
    data: {roles :['Admin','Manager','Responsable-Stage','Responsable-Formation','Responsable-Administrative']}*/},
      {
        path: 'service',/* canActivate: {AuthGuard}, data: {roles :['Admin','Manager']},*/
        loadChildren: () => import('./Components/Private/service/service.module').then(m => m.ServiceModule)
      },
      { path: 'dashboard', component: DashboardComponent /* canActivate: {AuthGuard}, data: {roles :['Admin','User']} */},
      {path: 'carriere', component: CarriereComponent,/*canActivate: {AuthGuard}, data: {roles :['Admin','Manager']}*/},
      {path: 'stage', component: MediaComponent,/*canActivate: {AuthGuard}, data: {roles :['Admin','Manager','Responsable-Stage']*/},
      {path: 'user', component: UserComponent,/*canActivate: {AuthGuard}, data: {roles :['Admin','Manager']}*/},
      {
        path: 'plan',/*
    canActivate: {AuthGuard},
    data: {roles :['Admin','Manager','Responsable-Stage','Responsable-Formation','Responsable-Administrative']},*/
        loadChildren: () => import('./Components/Private/plan/plan.module').then(m => m.PlanModule)
      },
      {
        path: 'formation',/*
    canActivate: {AuthGuard},
    data: {roles :['Admin','Manager','Responsable-Formation']},*/
        loadChildren: () => import('./Components/Private/formation/formation.module').then(m => m.FormationModule)
      }, {
        path: 'planning',/*
    canActivate: {AuthGuard},
    data: {roles :['Admin','Manager','Responsable-Formation']},*/
        loadChildren: () => import('./Components/Private/planning/planning.module').then(m => m.PlanningModule)
      },
    ],
  },
  {path:'sonabel/stage', component: PublicStageFormComponent},
  {path: 'error', component: ErrorPagesComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
