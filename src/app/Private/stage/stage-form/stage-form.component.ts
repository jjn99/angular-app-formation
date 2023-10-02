import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MessageService} from "primeng/api";
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { StageService } from 'src/app/Services/stage.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.scss']
})
export class StageFormComponent implements OnInit {

  onAddStage = new EventEmitter();
  onEditStage = new EventEmitter();
  private destroy$!: Subject<boolean>;
  uploadedFiles: any[] = [];
  visible=true;
  registrationForm!:FormGroup;
  responseMessage: any;
  response:any;

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onBasicUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


  countries: any[] = [];

  cities: any[]=[];

  filteredCountries: any[] = [];


  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private stageService: StageService,
    private dialogRef: MatDialogRef<StageFormComponent>
) {

}

ngOnInit(): void {
this.registrationForm = this.formBuilder.group({
nom: [null, [Validators.required]],
prenom: [null, [Validators.required]],
genre: [null, Validators.required],
age: [null, [Validators.required]],
ville: [null, [Validators.required]],
mail: [null, [Validators.required]],
cnib: [null, [Validators.required]],
phone: [null, [Validators.required]],
niveau: [null, [Validators.required]],
diplome: [null, [Validators.required]],
objet: [null, [Validators.required]],
dateDebut: [null, [Validators.required]],
dateFin: [null, [Validators.required]],
ecole: [null, [Validators.required]],
attestation: [null, [Validators.required]],
filecnib: [null, [Validators.required]],
cv: [null, [Validators.required]],
filediplome: [null, [Validators.required]]
});
this.destroy$ = new Subject<boolean>();
}

  
handleSubmit(){
  this.ngxService.start();
  this.addPostulant();
  this.addDemande();
 // this.addDoc();
  this.ngxService.stop();
  this.dialogRef.close();
  this.onAddStage.emit();
  this.registrationForm.reset();
}

addPostulant(){
  const formData = this.registrationForm.value;
  const data = {
    nom: formData.nom,
    prenom: formData.prenom,
    sexe: formData.genre,
    age: formData.age,
    cnib: formData.cnib,
    phone: formData.phone,
    niveau: formData.niveau,
    diplome: formData.diplome,
    ville: formData.ville,
    mail: formData.mail
  };
  this.stageService.addPostulant(data).pipe(takeUntil(this.destroy$)).subscribe(
    (response: any) => {
      this.responseMessage = response.message;
      this.messageService.add({severity:'success',
        summary:'Success',detail:'Ajout Postulant effectuer avec success.',life: 5000});
    },
    (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
        this.response = "false";
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.response = "false";
      }
      this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ajout Postulant.',life: 5000});
    }
  );
}

addDemande(){
  const formData = this.registrationForm.value;
  const data = {
    numeroDemande: formData.age + formData.cnib ,
    objet: formData.objet,
    dateDebut: formData.dateDebut,
    dateFin: formData.dateFin,
    ecole: formData.ecole,
    mail: formData.mail
  };
  this.stageService.addDemande(data).pipe(takeUntil(this.destroy$)).subscribe(
    (response: any) => {
      this.responseMessage = response.message;
      this.messageService.add({severity:'success',
        summary:'Success',detail:'Ajout Demande effectuer avec success.',life: 5000});
    },
    (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
        this.response = "false";
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.response = "false";
      }
      this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ajout demande.',life: 5000});
    }
  );
}

addDoc(){

  const formData = this.registrationForm.value;
  const  numeroDemande =  formData.age + formData.cnib;
  let i =0;
  for(i; i < 5 ; i++){
    if(i == 1){
      const file = formData.attestation;
      console.log(file);
      this.stageService.addDoc(numeroDemande , file).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.responseMessage = response.message;
          this.response = "true";
          this.messageService.add({severity:'success',
        summary:'Success',detail:'Ajout Document avec success.',life: 5000});
        },
        (error: any) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
            this.response = "false";
          } else {
            this.responseMessage = GlobalConstants.genericError;
            this.response = "false";
          }
          this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ejout document.',life: 5000});
        }
      );
    }
    if(i == 2){
      const file = formData.filecnib;
      console.log(file);
      this.stageService.addDoc(numeroDemande , file).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.responseMessage = response.message;
          this.response = "true";
        },
        (error: any) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
            this.response = "false";
          } else {
            this.responseMessage = GlobalConstants.genericError;
            this.response = "false";
          }
          this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ejout document.',life: 5000});
        }
      );

    }

    if(i == 3){
      const file = formData.cv;
      console.log(file);
      this.stageService.addDoc(numeroDemande , file).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.responseMessage = response.message;
          this.response = "true";
        },
        (error: any) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
            this.response = "false";
          } else {
            this.responseMessage = GlobalConstants.genericError;
            this.response = "false";
          }
          this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ejout document.',life: 5000});
        }
      );

    }
    if(i == 4){
      const file = formData.filediplome;
      console.log(file);
      this.stageService.addDoc(numeroDemande , file).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.responseMessage = response.message;
          this.response = "true";
        },
        (error: any) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
            this.response = "false";
          } else {
            this.responseMessage = GlobalConstants.genericError;
            this.response = "false";
          }
          this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec ejout document.',life: 5000});
        }
      );

    }
  }




}

}