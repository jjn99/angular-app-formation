import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { UserService } from 'src/app/Services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit,OnDestroy{
  
  private destroy$!: Subject<boolean>;
  dispayedColumn: string[] = ['roleName','action'];
  dataSource :any;
  registrationForm: any = FormGroup;
  responseMessage: any;
  value: any;
  value1:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private utilisateurService: UserService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<RoleComponent>
  ){}
  

  ngOnInit(): void {
    this.ngxService.stop();
    this.destroy$ = new Subject<boolean>();
    this.tableData();
  }

  add(element:any) {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      username: this.dialogData.data.username,
      rolename: element
    };
    this.utilisateurService.addRolesToUsers(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
        this.tableData();
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

  remove(element:any) {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      username: this.dialogData.data.username,
      rolename: element
    };
    this.utilisateurService.removeRolesToUsers(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
   
        this.tableData();
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

   tableData(){
    this.utilisateurService.getAllRoles().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
       console.log(error.error?.message);
       if(error.error?.message){
        this.responseMessage=error.error?.message;
       }else{
        this.responseMessage= GlobalConstants.genericError;
       }
       this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
      }
    )
  }

  exist(element:any){
    let i: any;
    for(i = 0 ; i < this.dialogData.data.appRoles.lenght -1 ; i++ ){
      if( this.dialogData.data.appRoles[i].roleName == element.roleName){
        this.value = true;
      }
      else{
        this.value1 = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
