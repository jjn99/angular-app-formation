import {Component, OnDestroy, OnInit} from '@angular/core';
import {Route, Router, RouterLink} from "@angular/router";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/Services/user.service';
import {Message, MessageService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  loginForm!: FormGroup;
  forgotPasswordForm!:FormGroup;

  constructor( private route:Router,
    private fb:FormBuilder,
      private ngxService:NgxUiLoaderService,
      private userService:UserService,
      private messageService: MessageService){}
 

  submitted = false;
  visiblePassword = false;
  responseMessage:any;

  changePassword(){
    this.visiblePassword = true;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required]),
    })
    this.destroy$ = new Subject<boolean>();
    this.forgotPasswordForm = this.fb.group({
      email: this.fb.control('',[Validators.required,Validators.email])
    })
  }

   //connexion
   handleSubmit(){
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
      username: formData.username,
      password: formData.password
    }
    this.userService.login(data).pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.messageService.add({severity:'success',summary:'Successful',detail:'Connexion Réussi',life: 3000});
      localStorage.setItem('token',response.token);
      this.route.navigate(['/dashboard']);
    },(error)=>{
      if(error.error?.message){
        this.ngxService.stop();
        this.responseMessage=error.error?.message;
        }else{
        this.ngxService.stop();
        this.responseMessage=error.error?.message;  
      }
      this.messageService.add({severity:'error',summary:'Erreur',detail:'Username ou Mot de passe incorrect',life: 3000});
    });
  }

  close(){
    this.visiblePassword = false;
    this.forgotPasswordForm.reset();
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.destroy$.next(true);
  }
}
