import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { AgentsService } from 'src/app/Services/agents.service';
import { FormationService } from 'src/app/Services/formation.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { FormSessionComponent } from '../form-session/form-session.component';

@Component({
  selector: 'app-form-agents',
  templateUrl: './form-agents.component.html',
  styleUrls: ['./form-agents.component.scss']
})
export class FormAgentsComponent implements OnInit{

  dataSource:any;
  registrationForm!: FormGroup;
  cols!: any;
  Agents!:any;
  responseMessage:any;
  personnels:any;
  visible=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private agentService:AgentsService,
    private formationService:FormationService,
    private messageService: MessageService,
    private ngxService: NgxUiLoaderService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormSessionComponent>){}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      idFormation: this.fb.control('',[Validators.required]),
  })
    this.cols = [
      { field: 'matricule', header: 'Matricule' },
      { field: 'nomprenom', header: 'Titre' },
      { field: 'categorie', header: 'Categorie' },
      { field: 'status', header: 'Status' },

    ];
    this.tableDataFormation();
    this.tableDataPersonnels();
  }

  getActif(value:any){
    const agents = this.dialogData.data.listAgents;
    if(agents.length > 0){
      if(agents.includes(value)){
        return true;
      }
      else{return false;}
    }
    else{ return false;}
  }

  tableDataFormation(){
    this.formationService.getAllFormation().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = response;
        console.log(this.dataSource);
      },(error:any)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else{
          this.responseMessage= GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
      }
    )
  }

  tableDataPersonnels(){
    this.agentService.getAllPersonnel().subscribe((response:any)=>{
      this.ngxService.stop();
      this.personnels = response;
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

  getClass(statut:string){
    if(statut ==='En-Retraite'){
      return 'retraite';
    }
    else{
      return 'activite';
    }
  }

  addToFormation(value:any) {
    this.ngxService.start();
    const data = {
      idFormation: this.dialogData.data.idFormation,
      matricule: value.matricule
    };
    this.formationService.addAgentToFormation(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
    
      }, 
      (error: any) => {
        this.ngxService.stop();
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
    const data = {
      idFormation: this.dialogData.data.idFormation,
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

  close(){
    
    this.visible = false;
  }

  onhide(){
    this.dialogRef.close();
    this.visible= false;
  }

}
