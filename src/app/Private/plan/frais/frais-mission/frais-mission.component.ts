import { Component,EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { FService } from 'src/app/Services/f.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-frais-mission',
  templateUrl: './frais-mission.component.html',
  styleUrls: ['./frais-mission.component.scss']
})
export class FraisMissionComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  onAddFrais = new EventEmitter();
  onEditFrais = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';
  lieu:any;
  visible=true;

 constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private fraisService: FService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<FraisMissionComponent>
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      categorie: this.formBuilder.control('', [Validators.required]),
      dure: this.formBuilder.control('', [Validators.required]),
      libelle: this.formBuilder.control('', [Validators.required]),
      prix: this.formBuilder.control('', [Validators.required]),
      localisation:this.formBuilder.control('', [Validators.required])
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
      idFraisMission: this.dialogData.data.idFraisMission,
      categorie: formData.categorie,
      dure: formData.dure,
      libelle: formData.libelle,
      prix: formData.prix,
      localisation: formData.localisation
    };
    this.fraisService.updateFrais(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditFrais.emit();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:'Modification effectuer avec success'});
    
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
    
      }
    );
  }

  add() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      categorie: formData.categorie,
      dure: formData.dure,
      libelle: formData.libelle,
      prix: formData.prix,
      localisation: formData.localisation
    };
    this.fraisService.addFrais(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddFrais.emit();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:'Ajout effectuer avec success'});
    
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
      }
    );
  }

  close(){
    this.registrationForm.reset();
    this.visible = false;
  }

  ngOnDestroy(): void {
    this.registrationForm.reset();
    this.destroy$.next(true);
  }

}
