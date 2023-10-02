import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { UserService } from 'src/app/Services/user.service';
import jwt_decode from "jwt-decode";
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {

  private destroy$!: Subject<boolean>;
  oldPassword= true;
  newPassword = true;
  confirmPassword = true;
  changePasswordForm:any = FormGroup;
  responseMessage:any;
  token:any = localStorage.getItem('token');
  tokenPayLoad:any;

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private messageService:MessageService,
    private dialogRef:MatDialogRef<ChangePasswordComponent>
  ) {    
     this.tokenPayLoad = jwt_decode(this.token); }
 

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:this.formBuilder.control('',[Validators.required]),
      newPassword:this.formBuilder.control('',[Validators.required]),
      confirmPassword:this.formBuilder.control('',[Validators.required])
    })
    this.destroy$ = new Subject<boolean>();
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value !=
     this.changePasswordForm.controls['confirmPassword'].value){
      return true;
     }else{
      return false;
     }
  }

  handleChangePasswordSubmit(){
    this.ngxService.start();
    const formData = this.changePasswordForm.value;
    const data={
      username: this.tokenPayLoad.sub,
      ancienPassword:formData.oldPassword,
      newPassword:formData.newPassword
    }
    this.userService.changePassword(data).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.messageService.add({severity:'success',summary:'Success',detail:'Modification effectuer avec success'});
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.messageService.add({severity:'error',summary:'Erreur',detail:'Echec de la modification'});
     })
  }

  ngOnDestroy(): void {
    this.changePasswordForm.reset();
    this.destroy$.next(true);
  }

}
