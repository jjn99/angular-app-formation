import { Component,EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { BudgetService } from 'src/app/Services/budget.service';
import { DirectionService } from 'src/app/Services/direction.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-budget-sous-entite',
  templateUrl: './budget-sous-entite.component.html',
  styleUrls: ['./budget-sous-entite.component.scss']
})
export class BudgetSousEntiteComponent  implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  onAddBudgetSousEntite = new EventEmitter();
  onEditBudgetSousEntite = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon= 'Add';
  action = 'Add';
  departement:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private directionService: DirectionService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<BudgetSousEntiteComponent>
  ) { }


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      budgetalloue: this.formBuilder.control('',[Validators.required]),
      datePlan: this.formBuilder.control('',[Validators.required]),
      idSousEntite: this.formBuilder.control('',[Validators.required])
    });
    this.destroy$ = new Subject<boolean>();

    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.registrationForm.patchValue(this.dialogData.data);
    }
    this.getSousEntite();

  }


  getSousEntite(){
    this.directionService.getAllSousEntite().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.departement = response;
      },(error:any)=>{
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
    
      }
    )
  }

  handleSubmit() {
    if (this.dialogActon === 'Edit') {
      this.edit();
      this.retirer();
    } else {
      this.add();
      this. ajout();
    }
  }


  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idBudgetSousEntite: this.dialogData.data.idBudgetSousEntite,
      budgetalloue: formData.budgetalloue,
      datePlan: formData.datePlan,
      idSousEntite: formData.sousEntite.idSousEntite
    };
    this.budgetService.updatetBudgetSousEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.onEditBudgetSousEntite.emit();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Sussess',detail:this.responseMessage});
    
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


  retirer() {
    const formData = this.registrationForm.value;
    const data = {
      ancien: this.dialogData.data.budgetAlloue,
      nouveau: formData.budgetalloue,
      datePlan: formData.datePlan,
      idEntite: this.dialogData.data.sousEntite.entite.idEntite
    };
    this.budgetService.retaitGlobal(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message;
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
      budgetalloue: formData.budgetalloue,
      datePlan: formData.datePlan,
      idSousEntite: formData.sousEntite.idSousEntite
    };
    this.budgetService.addBudgetSousEntite(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddBudgetSousEntite.emit();
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

  ajout() {
    const formData = this.registrationForm.value;
    const data = {
      budgetalloue: formData.budgetalloue,
      datePlan: formData.datePlan,
      idEntite: this.dialogData.data.sousEntite.entite.idEntite
    };
    this.budgetService.ajoutGlobal(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message;
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
