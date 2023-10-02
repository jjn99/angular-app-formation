import { Component,EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DirectionService } from 'src/app/Services/direction.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-sous-entite',
  templateUrl: './sous-entite.component.html',
  styleUrls: ['./sous-entite.component.scss']
})
export class SousEntiteComponent implements OnInit,OnDestroy{


  private destroy$!: Subject<boolean>;
  onAddSousEntite = new EventEmitter();
  onEditSousEntite = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon= 'Add';
  action= 'Add';
  directions: any;
  visible=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matDialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private directionService: DirectionService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<SousEntiteComponent>
  ) { }


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      codeinputation:this.formBuilder.control('',[Validators.required]),
      nom: this.formBuilder.control('',[Validators.required]),
      idEntite: this.formBuilder.control('',[Validators.required])
    });
    this.destroy$ = new Subject<boolean>();
    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.registrationForm.patchValue(this.dialogData.data);
    }
    this.getEntite();
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
      idSousEntite: this.dialogData.data.idSousEntite,
      nom: formData.nom,
      codeinputation: formData.codeinputation,
      idEntite: formData.idEntite
    };
    this.directionService.updateSousEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditSousEntite.emit();
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
      codeinputation: formData.codeinputation,
      idEntite: formData.idEntite
    };
    this.directionService.addNewSousEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddSousEntite.emit();
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
  }

  onHide(){
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this.registrationForm.reset();
    this.destroy$.next(true);
  }


}
