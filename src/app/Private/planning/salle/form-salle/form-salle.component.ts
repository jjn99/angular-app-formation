import { Component,EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SalleService } from 'src/app/Services/salle.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
  styleUrls: ['./form-salle.component.scss']
})
export class FormSalleComponent implements OnInit,OnDestroy{

  value!:string;
  private destroy$!: Subject<boolean>;
  onAddSalle = new EventEmitter();
  onEditSalle = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';
  visible=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private salleService: SalleService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<FormSalleComponent>
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      nom: this.formBuilder.control('',[Validators.required]),
      nbrPlace:  this.formBuilder.control('',[Validators.required]),
      description:  this.formBuilder.control(''),
    });
    this.destroy$ = new Subject<boolean>();
    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.registrationForm.patchValue(this.dialogData.data);
    }
  }
  handleSubmit() {
    if (this.dialogActon === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idSalle: this.dialogData.data.idSalle,
      nom: formData.nom,
      nbrPlace: formData.nbrPlace,
      description: formData.description
    };
    this.salleService.updateSalle(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditSalle.emit();
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

  add() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      nom: formData.nom,
      nbrPlace: formData.nbrPlace,
      description: formData.description
    };
    this.salleService.addSalle(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddSalle.emit();
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

  close(){
    this.visible=false;
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this.registrationForm.reset();
    this.destroy$.next(true);
  }

}
