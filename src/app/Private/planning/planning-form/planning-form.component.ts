import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PlanningService } from 'src/app/Services/planning.service';
import { SalleService } from 'src/app/Services/salle.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-planning-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.scss']
})
export class PlanningFormComponent implements OnInit,OnDestroy{

  visibleEvenement = true; 
   onAddEvenement = new EventEmitter();
  onEditEvenement = new EventEmitter();
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';
  salles: any;
  private destroy$!: Subject<boolean>;
  PlanningEvenementForm!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder:FormBuilder,
    private evenementService: PlanningService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private salleService:SalleService,
    private dialogRef: MatDialogRef<PlanningFormComponent>){}


  ngOnInit(): void {
    this.PlanningEvenementForm = this.formBuilder.group({
      evenement: this.formBuilder.control('',[Validators.required]),
      color:  this.formBuilder.control('',[Validators.required]),
      idSalle:  this.formBuilder.control('',[Validators.required]),
      dateDebut:  this.formBuilder.control('',[Validators.required]),
      dateFin: this.formBuilder.control('',[Validators.required]),
      heureDebut: this.formBuilder.control('',[Validators.required]),
      heureFin: this.formBuilder.control('',[Validators.required])
    }); 
    this.destroy$ = new Subject<boolean>();
    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.PlanningEvenementForm.patchValue(this.dialogData.data);
    }
    this.getAllSalle();
  }

  getAllSalle(){
    this.salleService.getAllSalle().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.salles = response;
      console.log(response);
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

  handleSubmit() {
    if (this.dialogActon === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  edit(){
    this.ngxService.start();
    const formData = this.PlanningEvenementForm.value;
    const data = {
      idPlannifier: this.dialogData.data.idPlannifier,
      evenement: formData.evenement,
      color:  formData.color,
      idSalle: formData.idSalle,
      dateDebut:  formData.dateDebut,
      dateFin: formData.dateFin,
      heureDebut: formData.heureDebut,
      heureFin: formData.heureFin
    };
    this.evenementService.updatePlannifier(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddEvenement.emit();
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
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
    
      }
    );
 
  }


  add(){
    this.ngxService.start();
    const formData = this.PlanningEvenementForm.value;
    const data = {
      evenement: formData.evenement,
      color:  formData.color,
      idSalle: formData.idSalle,
      dateDebut:  formData.dateDebut,
      dateFin: formData.dateFin,
      heureDebut: formData.heureDebut,
      heureFin: formData.heureFin
    };
    this.evenementService.addPlannifier(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddEvenement.emit();
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
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
    
      }
    );
 
  }

  onHide(){
    this.PlanningEvenementForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
