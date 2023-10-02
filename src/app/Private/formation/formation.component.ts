import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {BurkinaComponent} from "./burkina/burkina.component";
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationService } from 'src/app/Services/formation.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { FicheFormationComponent } from './fiche-formation/fiche-formation.component';
import { FormOrganismeComponent } from './form-organisme/form-organisme.component';
import { GestAgentsComponent } from './gest-agents/gest-agents.component';
import { SessionComponent } from './session/session.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormFormationComponent } from './form-formation/form-formation.component';
import { FormSessionComponent } from './form-session/form-session.component';
import { FormAgentsComponent } from './form-agents/form-agents.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {


  dispayedColumn: string[] = ['numeroInscription','titre','Organisme','ville','datePlan','action'];
  dataSource :any;
  responseMessage:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb:FormBuilder,
    private formationService: FormationService,
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
    this.formationService.getAllFormation().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },(error:any)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else{
          this.responseMessage= GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',summary:'Echec',detail:'Une erreur est survenue!'});
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
    dialogConfig.width="800px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(FormFormationComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onAddFormation.subscribe((response:any)=>{
      this.tableData();
    })

  }

  handleViewAction(value: any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {data:value};
    dialogConfig.width="900px";
    dialogConfig.disableClose=true;
    this.matDialog.open(FicheFormationComponent,dialogConfig);
  }


  handleEditAction(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="800px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data:value}
    const dialogRef= this.matDialog.open(FormFormationComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditFormation.subscribe((response:any)=>{
      this.tableData();
    })
  }


  handleDeleteAction(_t116: any) {
    throw new Error('Method not implemented.');
  }


  handleAddOrganismeAction() {
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


  handleGestAgents(value:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data = { data:value }
    const dialogRef= this.matDialog.open(FormAgentsComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    this.tableData();
   }

   handleGestSession(value:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="1500px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      data:value}
   const dialogRef= this.matDialog.open(FormSessionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    this.tableData();
   }

}
