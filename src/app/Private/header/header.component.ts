import {Component, HostListener, Input, OnInit} from '@angular/core';
import { userItems } from './header-data';
import jwt_decode from "jwt-decode";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserLoginUpdateComponent } from '../user/user-login-update/user-login-update.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{


  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  userItems = userItems;
  token:any = localStorage.getItem('token');
  tokenPayLoad:any;
  responseMessage:any;
  username:any;
  data:any;
  dataSource:any;

constructor(
     private dialog:MatDialog,
    private router:Router,
    private messageService:MessageService
    )
    {
      this.tokenPayLoad = jwt_decode(this.token);
      this.username= this.tokenPayLoad.sub;
    }


  @HostListener('window:resize', ['$event'])
  onResize($event: any){
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string{
    let styleClass='';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'head-trimmed';
    }
    else{
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number) : void{
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;
    }
    else{
      this.canShowSearchAsOverlay = false;
    }
  }


logout(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.width="550px";
  dialogConfig.data ={
    message: 'Quitter l\'application'
  };
  const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
  const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
    dialogRef.close();
    localStorage.clear();
    this.router.navigate(['/']);
    this.messageService.add({severity:'success',
        summary:'Success',detail:'Deconnexion Reussi.',life: 3000});
  })
}

changePassword(){
const dialogConfig= new MatDialogConfig();
dialogConfig.width="550px";
dialogConfig.disableClose=true;
this.dialog.open(ChangePasswordComponent,dialogConfig);
}

handleEditAction() {
  this.dataSource = this.data;
  const dialogConfig= new MatDialogConfig();
  dialogConfig.data= { data:this.dataSource }
  dialogConfig.width="700px";
  dialogConfig.disableClose=true;
  const dialogRef = this.dialog.open(UserLoginUpdateComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  })
    }

  }


