import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormSalleComponent} from "./form-salle/form-salle.component";
import { MessageService } from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MotifComponent } from './motif/motif.component';
import { SalleService } from 'src/app/Services/salle.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit,OnDestroy{


  private destroy$!: Subject<boolean>;
  dispayedColumn: string[] = ['nom','nbrPlace','statut','action'];
  dataSource :any;
  responseMessage:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salleService:SalleService,
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
    this.salleService.getAllSalle().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
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
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="750px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(FormSalleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onAddSalle.subscribe((response:any)=>{
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
    const dialogRef= this.matDialog.open(FormSalleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditSalle.subscribe((response:any)=>{
      this.tableData();
    })
  }


  handleOffAction(element:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="750px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data:element}
    const dialogRef= this.matDialog.open(MotifComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditSalle.subscribe((response:any)=>{
      this.tableData();
    })
  }

  handleOnAction(element:any) {
    this.ngxService.start();
    const formData = element;
    const data = {
      idSalle: formData.idSalle,
      statut: "Disponible"
    };
    this.salleService.updateSalle(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
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
        this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
     
      }
    );
  }

  getClass(statut:string){
    if(statut === 'Indisponible'){
      return 'indisponible';
    }
    else{
      return 'disponible';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
