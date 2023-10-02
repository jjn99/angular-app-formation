import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FraisMissionComponent} from "./frais-mission/frais-mission.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { BudgetService } from 'src/app/Services/budget.service';
import { DirectionService } from 'src/app/Services/direction.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.scss']
})
export class FraisComponent implements OnInit,OnDestroy {


  private destroy$!: Subject<boolean>;
 dispayedColumnFraisMission: string[] = ['libelle','categorie','dure','prix','localisation','action'];
  responseMessage:any;
  dataSourceFraisMission :any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb:FormBuilder,
    private ngxService:NgxUiLoaderService,
    private budgetService:BudgetService,
    private messageService:MessageService,
    private directionService: DirectionService,
    private dialog:MatDialog,
    private router:Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableDataFraisMission();
  }

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSourceFraisMission.filter = filterValue.trim().toLowerCase();
  }

  tableDataFraisMission(){
    this.budgetService.getAllFrais().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.dataSourceFraisMission = new MatTableDataSource(response);
        this.dataSourceFraisMission.sort = this.sort;
        this.dataSourceFraisMission.paginator = this.paginator;
        this.ngxService.stop();
      },(error:any)=>{
        console.log(error.error?.message);
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

  handledFraisMission(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(FraisMissionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
      this.tableDataFraisMission();
    })

    const sub= dialogRef.componentInstance.onAddFrais.subscribe((response:any)=>{
      this.tableDataFraisMission();
    })
  }

  handleEditFraisMission(value:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data: value
    }
    const dialogRef= this.matDialog.open(FraisMissionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })

    const sub= dialogRef.componentInstance.onEditFrais.subscribe((response:any)=>{
      this.tableDataFraisMission();
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
