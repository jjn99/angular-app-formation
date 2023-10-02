import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {AgentComponent} from "./agent/agent.component";
import {Router} from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentsService } from 'src/app/Services/agents.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { FicheAgentComponent } from './fiche-agent/fiche-agent.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carriere',
  templateUrl: './carriere.component.html',
  styleUrls: ['./carriere.component.scss']
})
export class CarriereComponent implements OnInit, OnDestroy{

  private destroy$!: Subject<boolean>;
  dispayedColumn: string[] = ['nomprenom','matricule','categorie','fonction','emploi','unite','statut','action'];
  dataSource :any;
  responseMessage:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentService:AgentsService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private router:Router,
    private matDialog: MatDialog,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableData();
  }

  tableData(){
    this.agentService.getAllPersonnel().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    },(error:any)=>{
      this.ngxService.stop();
       if(error.error?.message){
        this.responseMessage= GlobalConstants.genericError;
       }else{
        this.responseMessage= GlobalConstants.genericError;
       }
      this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
       }
    )
  }

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Add'
    }
    dialogConfig.width="1000px";
    dialogConfig.disableClose=true;
    const dialogRef = this.matDialog.open(AgentComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddAgent.subscribe((response:any)=>{
      this.dataSource();
    })
  }

  
  handleViewAction(value: any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {data:value};
   // dialogConfig.width="900px";
   // dialogConfig.height="700px";
    dialogConfig.disableClose=true;
    this.matDialog.open(FicheAgentComponent,dialogConfig);
    }


    handleEditAction(value:any) {
      const dialogConfig= new MatDialogConfig();
      dialogConfig.width="1000px";
      dialogConfig.disableClose=true;
      dialogConfig.data= {
        action:'Edit',
        data:value}
     const dialogRef= this.matDialog.open(AgentComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
      const sub= dialogRef.componentInstance.onEditAgent.subscribe((response:any)=>{
        this.tableData();
      })
        }


    handleDeleteAction(value: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width="500px";
      dialogConfig.disableClose=true;
      dialogConfig.data={
        message:'supprimer l\'agent '+value.nomprenom+' matricule: '+value.matricule
      };
      const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
      const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
        this.ngxService.start();
        this.deleteAgent(value.id);
        dialogRef.close();
      })
    }

    deleteAgent(id:any){
      this.agentService.deleteAgent(id).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.tableData();
        this.responseMessage= response?.message;
        this.messageService.add({severity:'success',summary:'Personnels',detail:'Upprimer avec succes!'});
      },(error:any)=>{
        this.ngxService.stop();
         console.log(error.error?.message);
         if(error.error?.message){
          this.responseMessage=error.error?.message;
         }else{
          this.responseMessage= GlobalConstants.error;
         }
         this.messageService.add({severity:'error',summary:'Dashboard',detail:'Une erreur est survenue!'});
      }
      )
    }

    getClass(statut:string){
      if(statut ==='En-Retraite'){
        return 'retraite';
      }
      else{
        return 'activite';
      }
    }

    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.dataSource =null;
    }

}
