import { Component,EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DirectionService } from 'src/app/Services/direction.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-entite',
  templateUrl: './entite.component.html',
  styleUrls: ['./entite.component.scss']
})
export class EntiteComponent implements OnInit,OnDestroy{


  private destroy$!: Subject<boolean>;
  onAddEntite = new EventEmitter();
  onEditEntite = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';
  visible=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private directionService: DirectionService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<EntiteComponent>
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      codeinputation:this.formBuilder.control('',[Validators.required]),
      nom: this.formBuilder.control('',[Validators.required]),
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
      idEntite: this.dialogData.data.idEntite,
      nom: formData.nom,
      codeinputation: formData.codeinputation
    };
    this.directionService.updateEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditEntite.emit();
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
      codeinputation: formData.codeinputation
    };
    this.directionService.addNewEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddEntite.emit();
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
