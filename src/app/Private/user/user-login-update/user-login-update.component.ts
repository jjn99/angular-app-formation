import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user-login-update',
  templateUrl: './user-login-update.component.html',
  styleUrls: ['./user-login-update.component.scss']
})
export class UserLoginUpdateComponent implements OnInit, OnDestroy{

  private destroy$!: Subject<boolean>;
  onEditUser= new EventEmitter();
  userForm:any = FormGroup;
  responseMessage:any;
  visible=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private userService : UserService,
    public dialogRef:MatDialogRef<UserLoginUpdateComponent>,
    private messageService:MessageService,
    private ngxService:NgxUiLoaderService
  ) { }



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required,Validators.pattern(GlobalConstants.username)]),
      email: this.formBuilder.control('',[Validators.required]),
      matricule:this.formBuilder.control('',[Validators.required]),
      numeroTelephone:this.formBuilder.control('',[Validators.required])
    })
    this.destroy$ = new Subject<boolean>();
    this.userForm.patchValue(this.dialogData.data);
 
  }

  handleUpdateUser(){
    this.ngxService.start();
    const formData= this.userForm.value;
    const data ={
      id: this.dialogData.data.id,
      username: formData.username,
      email: formData.email,
      matricule: formData.matricule,
      numeroTelephone : formData.numeroTelephone
    }
    this.userService.updateUser(data).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage =response.message;
      this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
       }else{
        this.responseMessage= GlobalConstants.genericError;
       }
       this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
      }
    )
  }

  close(){
    this.visible = false;
  }

  onHide(){
    this.userForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  
}
