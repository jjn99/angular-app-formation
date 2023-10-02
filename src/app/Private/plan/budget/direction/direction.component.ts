import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BudgetEntiteComponent} from "./budget-entite/budget-entite.component";
import { MessageService } from 'primeng/api';
import jwt_decode from "jwt-decode";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BudgetService } from 'src/app/Services/budget.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit, OnDestroy{

private destroy$!: Subject<boolean>;
  dispayedColumnBudgetEntite: string[] = ['datePlan','budgetGlobalAlloue','budgetAlloue','tauxRealisation','statut','action'];
  responseMessage:any;
  dataSourceBudgetEntite :any;
  dataSourceLieu:any;
  token:any = localStorage.getItem('token');
  tokenPayLoad:any;
  role!:boolean;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private ngxService:NgxUiLoaderService,
    private budgetService:BudgetService,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) {
    //this.tokenPayLoad = jwt_decode(this.token);
  }
 

  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableDataBudgetEntite();
    //this.isAdminOrManager();
    //this.tableDataLieu();
  }

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSourceBudgetEntite.filter = filterValue.trim().toLowerCase();
  }

  tableDataBudgetEntite(){
    this.budgetService.getAllBudget().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
        this.dataSourceBudgetEntite = new MatTableDataSource(response);
        this.dataSourceBudgetEntite.sort = this.sort;
        this.dataSourceBudgetEntite.paginator = this.paginator;
      },(error:any)=>{
        console.log(error.error?.message);
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else{
          this.responseMessage= GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
      }
    )
  }

/* 
  tableDataLieu(){
    this.budgetService.getAllLieu().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceLieu = new MatTableDataSource(response);
      },(error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else{
          this.responseMessage= GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
      }
    )
  } */

  handleAddBudgetEntiteAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(BudgetEntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })

    const sub= dialogRef.componentInstance.onAddBudgetEntite.subscribe((response:any)=>{
      this.tableDataBudgetEntite();
    })

  }

  handleEditBudgetEntite(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data: value }
    const dialogRef= this.matDialog.open(BudgetEntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditBudgetEntite.subscribe((response:any)=>{
      this.tableDataBudgetEntite();
    })

  }
/* 
  handleActiveBudget(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="550px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(ActivatePagesComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
      this.tableDataBudgetEntite();
      this.tableDataLieu();
    }) 
    const sub= dialogRef.componentInstance.onActivate.subscribe((response:any)=>{
      this.tableDataBudgetEntite();
    })
  }
*/

getClass(statut:string){
  if(statut === 'Non-Debuter'){
    return 'nonDebuter';
  }
  else if(statut === 'Debuter'){
    return 'Debuter';
  }
  else{
    return 'Terminer';
  }
}

/* 
  handledAddLieu(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(LieuComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })

    const sub= dialogRef.componentInstance.onAddLieu.subscribe((response:any)=>{
      this.tableDataLieu();
    })

  } */

 /*  isAdminOrManager(){
    let i = 0 ;
    for(i ; i < (this.tokenPayLoad.roles.length + 1) ; i++ ){
      if(this.tokenPayLoad.roles[i] ==='Admin' || this.tokenPayLoad.roles[i] ==='Manager'){
        this.role = true;
        break;
      }
      else{
        this.role = false;
      }
    }
  } */

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
