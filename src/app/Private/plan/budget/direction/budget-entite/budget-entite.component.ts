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
  selector: 'app-budget-entite',
  templateUrl: './budget-entite.component.html',
  styleUrls: ['./budget-entite.component.scss']
})
export class BudgetEntiteComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  onAddBudgetEntite = new EventEmitter();
  onEditBudgetEntite = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action= 'Add';
  directions:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private directionService: DirectionService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<BudgetEntiteComponent>
  ) {}


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      budgetalloue: this.formBuilder.control('',[Validators.required]),
      datePlan: this.formBuilder.control('',[Validators.required]),
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
    }
  }


  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idBudget: this.dialogData.data.idBudget,
      budgetalloue: formData.budgetalloue,
      datePlan: formData.datePlan,
      idEntite: formData.idEntite
    };
    this.budgetService.updateBudget(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.onEditBudgetEntite.emit();
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

  add() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      budgetalloue: formData.budgetalloue,
      datePlan: formData.datePlan,
      idEntite: formData.idEntite
    };
    this.budgetService.addBudget(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddBudgetEntite.emit();
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

  retirer() {
    const formData = this.registrationForm.value;
    const data = {
      ancien: this.dialogData.data.budgetAlloue,
      nouveau: formData.budgetalloue,
      datePlan: formData.datePlan,
      idEntite: this.dialogData.data.idEntite
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
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
