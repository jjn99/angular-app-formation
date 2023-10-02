import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EntiteComponent} from "./entite/entite.component";
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { DirectionService } from 'src/app/Services/direction.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  dispayedColumnEntite: string[] = ['idEntite','codeinputation','nom','action'];

   dataSourceEntite :any;
  responseMessage:any;
  tauxBudget :any;
  tauxGlobal:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb:FormBuilder,
    private directionService:DirectionService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableDataEntite();
  }

  tableDataEntite(){
    this.directionService.getAllEntite().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceEntite = new MatTableDataSource(response);
        this.dataSourceEntite.sort = this.sort;
        this.dataSourceEntite.paginator = this.paginator;
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
  }


  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSourceEntite.filter = filterValue.trim().toLowerCase();
  }


  handleAddAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(EntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onAddEntite.subscribe((response:any)=>{
      this.tableDataEntite();
    })

  }

  handleEditEntite(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data:value}
    const dialogRef= this.matDialog.open(EntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditEntite.subscribe((response:any)=>{
      this.tableDataEntite();
    })
  }


  handleDeleteEntiteAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="500px";
    dialogConfig.disableClose=true;
    dialogConfig.data={
      message:'supprimer '+value.nom+' ('+value.codeinputation+').'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteEntite(value.idEntite);
      dialogRef.close();
    })
  }

  deleteEntite(idEntite:number){
    this.directionService.deleteEntite(idEntite).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceEntite();
        this.responseMessage = response?.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
      }
      ,(error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else{
          this.responseMessage= GlobalConstants.error;
        }
             this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
     }
    )
  }


  handleViewAction(_t88: any) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


}
