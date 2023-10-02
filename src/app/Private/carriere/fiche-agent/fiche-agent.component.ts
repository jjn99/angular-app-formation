import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { FormationService } from 'src/app/Services/formation.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-fiche-agent',
  templateUrl: './fiche-agent.component.html',
  styleUrls: ['./fiche-agent.component.scss']
})
export class FicheAgentComponent implements OnInit, OnDestroy{

  private destroy$!: Subject<boolean>;
  agentForm:any;
  dataSource:any;
  visible=true;
  responseMessage:any;
  size!:number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formationService:FormationService,
    private messageService: MessageService,
    public dialogRef:MatDialogRef<FicheAgentComponent>
  ) { }
 

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.agentForm = this.dialogData.data;
  }

  getFormationByAgent(){
    const idPersonnel = this.dialogData.data.idPersonnel;
    this.formationService.getFormationByAgent(idPersonnel).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      
      this.dataSource = response;
      this.size = this.dataSource.length();
    },(error:any)=>{
       if(error.error?.message){
        this.responseMessage= GlobalConstants.genericError;
       }else{
        this.responseMessage= GlobalConstants.genericError;
       }
      this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
       }
    )
  }


  close(){
    this.visible=false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
