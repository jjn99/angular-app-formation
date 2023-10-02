import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DirectionService } from 'src/app/Services/direction.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { StageService } from 'src/app/Services/stage.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-traiter-demande',
  templateUrl: './traiter-demande.component.html',
  styleUrls: ['./traiter-demande.component.scss']
})
export class TraiterDemandeComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  onAccorder = new EventEmitter();
  onReject = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Accorder';
  action = 'Accorder';
  directions: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private stageService: StageService,
    private directionService: DirectionService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<TraiterDemandeComponent>
  ) {}
    
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      subject: [null, [Validators.required]],
      text: [null, Validators.required],
      });
      this.destroy$ = new Subject<boolean>();
      if (this.dialogData.action === 'Rejeter') {
        this.dialogActon = 'Rejeter';
        this.action = 'Rejeter';
      }
      this.getEntite();
  }

  submit(){
    if(this.dialogActon === 'Accorder'){
      this.validate();
    }
    else{
      this.reject();
    }
  }


  validate(){
    this.ngxService.start();
    const data= {
      idDemande: this.dialogData.data.idDemande,
      statut: "Traiter",
      statutTraitement: "Accorder",
      objet:this.dialogData.data.objet,
      mail: this.dialogData.data.postulant.mail,
      dateDebut: this.dialogData.data.dateDebut,
      dateFin: this.dialogData.data.dateFin

    }
    this.stageService.updateDemande(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAccorder.emit();
      this.responseMessage = response.message;
      this.messageService.add({severity:'success', 
      summary:'Success', detail:'Traitement effectuer avec success',life:5000});
    }),
    (error: any) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec Traitement demande.',life: 5000});
    }
  }

  reject(){
    this.ngxService.start();
    const data= {
      idDemande: this.dialogData.data.idDemande,
      statut: "Traiter",
      statutTraitement: "Rejeter",
      objet:this.dialogData.data.objet,
      mail: this.dialogData.data.postulant.mail,
      dateDebut: this.dialogData.data.postulant.dateDebut,
      dateFin: this.dialogData.data.dateFin

    }
    this.stageService.updateDemande(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onReject.emit();
      this.responseMessage  = response.message;
      this.messageService.add({severity:'success', 
      summary:'Success', detail:'Traitement effectuer avec success',life:5000});
    }),
    (error: any) => {
      this.ngxService.stop();
      if (error.error?.message) {
        
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.messageService.add({severity:'error',
        summary:'Erreur',detail:'Echec Traitement demande.',life: 5000});
    }
  }


  getEntite(){
    this.directionService.getAllEntite().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.directions=response;
      },(error:any)=>{
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
  
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


}
