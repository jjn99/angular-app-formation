import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { AgentsService } from 'src/app/Services/agents.service';
import { FormationService } from 'src/app/Services/formation.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-gest-agents',
  templateUrl: './gest-agents.component.html',
  styleUrls: ['./gest-agents.component.scss']
})
export class GestAgentsComponent implements OnInit{

    dispayedColumn: string[] = ['nomprenom','matricule','categorie','fonction','emploi','unite','statut','action'];
  dataSource :any;
  responseMessage:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private agentService:AgentsService,
    private ngxService:NgxUiLoaderService,
    private messageService:MessageService,
    private formationService: FormationService){

    }
    
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   tableData(){
    this.agentService.getAllPersonnel().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    },(error:any)=>{
      this.ngxService.stop();
       console.log(error.error?.message);
       if(error.error?.message){
        this.responseMessage=error.error?.message;
       }else{
        this.responseMessage= GlobalConstants.genericError;
       }
       this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
     }
    )
  }

  getClass(statut:String){
    if(statut ==='En-Retraite'){
      return 'retraite';
    }
    else{
      return 'activite';
    }
  }

  getActif(value:any){
    let agents: any[] = this.dialogData.data.listAgents;
    if(agents.length > 0){
      if(agents.includes(value)){
        return true;
      }
      else{return false;}
    }
    else{ return false;}
  }

  addToFormation(value:any) {
    var data = {
      numeroInscription: this.dialogData.data.numeroInscription,
      matricule: value.matricule
    };
    this.formationService.addAgentToFormation(data).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
    
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
    
      }
    );
  }

  removeToFormation(value:any) {
    var data = {
      numeroInscription: this.dialogData.numeroInscription,
      matricule: value.matricule
    };
    this.formationService.removeAgentToFormation(data).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
    
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
    
      }
    );
  }

}
