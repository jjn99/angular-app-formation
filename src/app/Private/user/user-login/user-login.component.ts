import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit,OnDestroy {

  private destroy$!: Subject<boolean>;
  password=true;
  onAddUser = new EventEmitter();
  confirmpassword=true;
  registrationForm: any = FormGroup;
  responseMessage:any;
  date!: Date;
  value!:string;
  visible=true;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef:MatDialogRef<UserLoginComponent>
  ) { }
  
  

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      username:[null, [Validators.required]],
      password:[null, Validators.required],
      email:[null, [Validators.required]],
      matricule:[null, Validators.required],
      numeroTelephone:[null,[Validators.required,]],
      confirmPassword:[null,[Validators.required]]
    })
    this.destroy$ = new Subject<boolean>();
  }

  handleSubmit(){
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data ={
      username:formData.username,
      matricule:formData.matricule,
      password:formData.password,
      email:formData.email,
      numeroTelephone:formData.numeroTelephone
    }
    this.userService.addNewUser(data).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
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
    })
  }

  close(){
    
    this.visible=false;
  }

  onHide(){
    this.registrationForm.reset();
  }

ngOnDestroy(): void {
  this.destroy$.next(true);
}

}
