import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserLoginComponent} from "./user-login/user-login.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { UserService } from 'src/app/Services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { UserLoginUpdateComponent } from './user-login-update/user-login-update.component';
import { RoleComponent } from './role/role.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  dispayedColumn: string[] = ['username','matricule','email','numeroTelephone','action'];
  dataSource :any;
  responseMessage:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableData();
  }

  tableData(){
    this.userService.getAllUser().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  applyFilter(event:Event) {

    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="800px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(UserLoginComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
     this.tableData();
    })
    const sub = dialogRef.componentInstance.onAddUser.subscribe((response:any)=>{
      this.dataSource();
    })
  }

  handleAddRoleAction(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.data= {
      data:value}
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(RoleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
      this.tableData();
    })
  }

  handleRemoveRoleAction(value:any) {
    throw new Error('Method not implemented.');
  }


  handleEditAction(value:any) {

    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {data:value}
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef = this.matDialog.open(UserLoginUpdateComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditUser.subscribe((response:any)=>{
      this.tableData();
    })
  }


  handleDeleteAction(value:any) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
