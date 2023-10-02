import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';
import { FormOrganismeComponent } from '../form-organisme/form-organisme.component';
import { MessageService } from 'primeng/api';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss']
})
export class OrganismeComponent implements OnInit {


  dispayedColumn: string[] = ['nom','domaine','contact','lieu','action'];
  dataSource :any;
 //length1:any;
  responseMessage:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb:FormBuilder,
    private organismeService:OrganismeService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.organismeService.getAllOrganisme().subscribe((response:any)=>{
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
       this.messageService.add({severity:'error',summary:'Erreur',detail:this.responseMessage});
      }
    )
  }

  applyFilter(event:Event) {

    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="750px";
    dialogConfig.disableClose=true;
   const dialogRef= this.matDialog.open(FormOrganismeComponent,dialogConfig);
   this.router.events.subscribe(()=>{
    dialogRef.close();
  })
  const sub= dialogRef.componentInstance.onAddOrganisme.subscribe((response:any)=>{
    this.tableData();
  })
    
 }


      handleEditAction(value:any) {
        const dialogConfig= new MatDialogConfig();
        dialogConfig.width="750px";
        dialogConfig.disableClose=true;
        dialogConfig.data= {
          action:'Edit',
          data:value}
       const dialogRef= this.matDialog.open(FormOrganismeComponent,dialogConfig);
        this.router.events.subscribe(()=>{
          dialogRef.close();
        })
        const sub= dialogRef.componentInstance.onEditOrganisme.subscribe((response:any)=>{
          this.tableData();
        })
          }



}
