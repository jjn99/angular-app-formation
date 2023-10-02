import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SalleService } from 'src/app/Services/salle.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-motif',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.scss']
})
export class MotifComponent implements OnInit, OnDestroy{
  
  private destroy$!: Subject<boolean>;
  onEditSalle = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private salleService: SalleService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<MotifComponent>
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      nom: this.formBuilder.control('',[Validators.required]),
      nbrPlace: this.formBuilder.control('',[Validators.required]),
      motif: this.formBuilder.control('',[Validators.required]),
    });
    this.destroy$ = new Subject<boolean>();
    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.registrationForm.patchValue(this.dialogData.data);
    }
  }

  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idSalle: this.dialogData.data.idSalle,
      nom: formData.nom,
      nbrPlace: formData.nbrPlace,
      motif: formData.motif,
      statut: "Indisponible"
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


  ngOnDestroy(): void {
    this.registrationForm.reset();
    this.destroy$.next(true);
  }

}
