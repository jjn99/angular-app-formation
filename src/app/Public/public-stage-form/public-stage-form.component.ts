import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SnackBarService} from "../../../Services/snack-bar.service";
import {StageService} from "../../../Services/stage.service";
import {GlobalConstants} from "../../../shared/global-constants";
import { Subject, takeUntil } from 'rxjs';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-public-stage-form',
  templateUrl: './public-stage-form.component.html',
  styleUrls: ['./public-stage-form.component.scss']
})
export class PublicStageFormComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  uploadedFiles: any[] = [];

  registrationForm: any = FormGroup;
  responseMessage: any;
  response:any;
  DateInscription:any;
  minDate!:Date;
  maxDate!:Date;
  number =0;
  

  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackBarService,
    private stageService: StageService
  ) {
    this.minDate= new Date();
    this.DateInscription= new Date();
  }


  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
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
     /* attestation: [null, [Validators.required]],
       filecnib: [null, [Validators.required]],
      cv: [null, [Validators.required]],
      filediplome: [null, [Validators.required]] */
    });
  }

  handleSubmit(){
    this.ngxService.start();
    this.addPostulant();
    this.addDemande();
   // this.addDoc();
   this.registrationForm.reset();
    this.ngxService.stop();
  }

  addPostulant(){
    console.log("addPostulant");
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
      }
    );
  }

  addDemande(){
    console.log("addDemande");
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
      }
    );
  }

  addDoc(){

    const formData = this.registrationForm.value;
    const  numeroDemande =  formData.age + formData.cnib + this.number ;
    let i =0;
    for(i; i < 5 ; i++){
      if(i == 1){
        const file = formData.attestation;
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
          }
        );

      }
    }


  }


  Verify(value:any[]){
    if(value.length != 0){
      return 1;
    }else{
      let nbr: number;
      return nbr = value.length + 1;
    }
  }

  onUpload(event:UploadEvent) {
    for(const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
