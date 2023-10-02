import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {SousEntiteComponent} from "./sous-entite/sous-entite.component";
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DirectionService } from 'src/app/Services/direction.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent  implements OnInit,OnDestroy{


  private destroy$!: Subject<boolean>;
  dispayedColumnSousEntite: string[] = ['idSousEntite','codeinputation','nom','action'];
  dataSourceSousEntite :any;
  responseMessage:any;
  tauxBudget :any;
  tauxGlobal:any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(

    private directionService:DirectionService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {

    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableDataSousEntite();
  }

  tableDataSousEntite(){
    this.directionService.getAllSousEntite().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceSousEntite = new MatTableDataSource(response);
        this.dataSourceSousEntite.sort = this.sort;
        this.dataSourceSousEntite.paginator = this.paginator;
      },(error:any)=>{
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

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSourceSousEntite.filter = filterValue.trim().toLowerCase();
  }

  handleAddSousEntiteAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(SousEntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
      this.tableDataSousEntite();
    })
    const sub= dialogRef.componentInstance.onAddSousEntite.subscribe((response:any)=>{
      this.tableDataSousEntite();
    })

  }

  handleEditSousEntite(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data:value}
    const dialogRef= this.matDialog.open(SousEntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
      this.tableDataSousEntite();
    })
    const sub= dialogRef.componentInstance.onEditSousEntite.subscribe((response:any)=>{
      this.tableDataSousEntite();
    })
  }

  handleDeleteSousEntiteAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="500px";
    dialogConfig.disableClose=true;
    dialogConfig.data={
      message:'supprimer le '+value.nom+' ('+value.codeinputation+')'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteSousEntite(value.idSousEntite);
      dialogRef.close();
    })
  }

  deleteSousEntite(idSousEntite:any){
    this.directionService.deleteSousEntite(idSousEntite).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceSousEntite();
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


}
