import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-form-organisme',
  templateUrl: './form-organisme.component.html',
  styleUrls: ['./form-organisme.component.scss']
})
export class FormOrganismeComponent implements OnInit {


  onAddOrganisme = new EventEmitter();
  onEditOrganisme = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon: any = 'Add';
  action: any = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private organismeService: OrganismeService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<FormOrganismeComponent>
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      nom: this.formBuilder.control('',[Validators.required]),
      domaine: this.formBuilder.control('',[Validators.required]),
      contact: this.formBuilder.control('',[Validators.required]),
      lieu: this.formBuilder.control('',[Validators.required])
    });
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
    var formData = this.registrationForm.value;
    var data = {
      idOrganisme: this.dialogData.data.idOrganisme,
      nom: formData.nom,
      domaine: formData.domaine,
      contact: formData.contact,
      lieu: formData.lieu
    };
    this.organismeService.updateOrganisme(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditOrganisme.emit();
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
        this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
   
      }
    );
  }

  add() {
    this.ngxService.start();
    var formData = this.registrationForm.value;
    var data = { 
      nom: formData.nom,
      domaine: formData.domaine,
      contact: formData.contact,
      lieu: formData.lieu
    };
    this.organismeService.addOrganisme(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddOrganisme.emit();
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
        this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
   
      }
    );
  }


}
