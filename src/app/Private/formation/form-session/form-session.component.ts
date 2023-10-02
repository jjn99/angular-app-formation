import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { FormationService } from 'src/app/Services/formation.service';
import { SessionService } from 'src/app/Services/session.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss']
})
export class FormSessionComponent implements OnInit{

  registrationForm!: FormGroup;
  sessions :any;
  responseMessage:any;
  minDate = new Date();
  maxDate! : Date;
  dateRetour!: Date;
  selectFormation:any;
  visible=true;
  diavisible:boolean | undefined;
  cols!: any;
  titre= this.dialogData.data.titre;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb:FormBuilder,
    private formationService: FormationService,
    private ngxService:NgxUiLoaderService,
    private messageService:MessageService,
    private sessionService: SessionService,
    private dialogRef: MatDialogRef<FormSessionComponent>
  ) { }


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      //idFormation: this.fb.control('',[Validators.required]),
      dateDepart:  this.fb.control('',[Validators.required]),
      dateRetour:  this.fb.control('',[Validators.required]),
      dateDebut:  this.fb.control('',[Validators.required]),
      dateFin:  this.fb.control('',[Validators.required])
    });
    this.cols = [
      { field: 'dateDepart', header: 'Date Depart' },
      { field: 'dateDebut', header: 'Date Debut' },
      { field: 'dateFin', header: 'Date Fin' },
      { field: 'dateRetour', header: 'Date Fin' }

    ];
  //  this.tableData();
  }


  tableData(){
    this.sessionService.getSessionByIdFormation(this.dialogData.data.idFormation).subscribe((response:any)=>{
        this.ngxService.stop();
        this.sessions = response;
        console.log(response);
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


  add() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      dateDepart: formData.dateDepart,
      dateRetour: formData.dateRetour,
      dateSessionDebut: formData.dateDebut,
      dateSessionFin: formData.dateFin,
      idFormation: this.dialogData.data.idFormation
    };
    this.sessionService.addSession(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.visible= false;
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
        this.registrationForm.reset();
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
     
      }
    );
  }

  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idSession: formData.idSession,
      dateDepart: formData.dateDepart,
      dateRetour: formData.dateRetour,
      dateSessionDebut: formData.dateDebut,
      dateSessionFin: formData.dateFin,
      idFormation: this.dialogData.data.idFormation
    };
    this.sessionService.addSession(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
        this.registrationForm.reset();
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
     
      }
    );
  }

  addSession(){
    this.diavisible = true;
  }


  close(){
    this.visible = false;
  }

  closeDia(){
    this.diavisible = false;
  }
  
  onhide(){
    this.registrationForm.reset();
    this.dialogRef.close();
  }


  onHideDia(){
    this.registrationForm.reset();
  }



}
