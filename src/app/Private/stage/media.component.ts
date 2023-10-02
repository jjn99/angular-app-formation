import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgentComponent} from "../carriere/agent/agent.component";
import {MessageService} from "primeng/api";
import {StageFormComponent} from "./stage-form/stage-form.component";
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { TraiterDemandeComponent } from './traiter-demande/traiter-demande.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StageService } from 'src/app/Services/stage.service';
import { Subject, takeUntil } from 'rxjs';
import { PublicStageFormComponent } from '../../Public/public-stage-form/public-stage-form.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  providers: [MessageService]
})
export class MediaComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  dispayedColumn: string[] = ['nomPrenom','objet','niveau','mail','dateDebut','statut','action'];
  dataSource :any;
  responseMessage:any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private stageService:StageService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) { }


  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="1000px";
    dialogConfig.height="750px";
    dialogConfig.disableClose=true;
    const dialogRef = this.matDialog.open(StageFormComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onAddStage.subscribe((response:any)=>{
      this.tableData();
    })

  }

  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableData();
  }

  tableData(){
    this.stageService.getAllDemande().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
      console.log(response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getClass(statut:string){
    if(statut ==='Non-Traiter'){
      return 'nonTraiter';
    }
    else{
      return 'Traiter';
    }
  }

  
  handleAccorder(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {
      action:'Accorder',
      data:value}
    dialogConfig.width="500px";
    dialogConfig.disableClose=true;
   const dialogRef= this.matDialog.open(TraiterDemandeComponent,dialogConfig);
   this.router.events.subscribe(()=>{
    dialogRef.close();
  })
  const sub= dialogRef.componentInstance.onAccorder.subscribe((response:any)=>{
    this.tableData();
  })
 }

 handleRejeter(value:any) {
  const dialogConfig= new MatDialogConfig();
  dialogConfig.data= {
    action:'Rejeter',
    data:value}
  dialogConfig.width="500px";
  dialogConfig.disableClose=true;
 const dialogRef= this.matDialog.open(TraiterDemandeComponent,dialogConfig);
 this.router.events.subscribe(()=>{
  dialogRef.close();
})
const sub= dialogRef.componentInstance.onReject.subscribe((response:any)=>{
  this.tableData();
})
}


/*          handleRenouveller(value:any) {
          const dialogConfig= new MatDialogConfig();
          dialogConfig.data= {
            action:'Edit',
            data:value}
          dialogConfig.width="1000px";
          dialogConfig.disableClose=true;
         const dialogRef= this.matDialog.open(TraiterDemandeComponent,dialogConfig);
         this.router.events.subscribe(()=>{
          dialogRef.close();
        })
        const sub= dialogRef.componentInstance.onRenouvelle.subscribe((response:any)=>{
          this.tableData();
        })
          
       } */


       ngOnDestroy(): void {
        this.destroy$.next(true);
      }
}
