import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/Services/session.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit{

  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon: any = 'Add';
  action: any = 'Add';
  dataSource :any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<SessionComponent>
  ) { 
  }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      dateDepart: this.formBuilder.control('',[Validators.required]),
      dateRetour: this.formBuilder.control('',[Validators.required]),
      dateDebut: this.formBuilder.control('',[Validators.required]),
      dateFin: this.formBuilder.control('',[Validators.required])
    });
  }
  
  addSession() {
    var formData = this.registrationForm.value;
    var data = {
      numeroInscription: this.dialogData.data.numeroInscription,
      dateDepart: formData.dateDepart,
      dateRetour: formData.dateRetour,
      dateSessionFin: formData.dateFin,
      dateSessionDebut: formData.dateDebut,
    };
    this.sessionService.addSession(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
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
