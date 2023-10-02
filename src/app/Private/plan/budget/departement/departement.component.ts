import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {BudgetSousEntiteComponent} from "./budget-sous-entite/budget-sous-entite.component";
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BudgetService } from 'src/app/Services/budget.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent  implements OnInit, OnDestroy{


  private destroy$!: Subject<boolean>;
  dispayedColumnBudgetSousEntite: string[] = ['datePlan','budgetAlloue','budgetRealisation','tauxRealisation','statut','action'];
  responseMessage:any;
  dataSourceBudgetSousEntite :any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private ngxService:NgxUiLoaderService,
    private messageService:MessageService,
    private budgetService: BudgetService,
    private dialog:MatDialog,
    private router:Router,
    private matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableDataBudgetSousEntite();
  }

  applyFilter(event:Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSourceBudgetSousEntite.filter = filterValue.trim().toLowerCase();
  }

  tableDataBudgetSousEntite(){
    this.budgetService.getAllBudgetSousEntite().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSourceBudgetSousEntite = new MatTableDataSource(response);
        console.log(response);
        this.dataSourceBudgetSousEntite.sort = this.sort;
        this.dataSourceBudgetSousEntite.paginator = this.paginator;
      },(error:any)=>{
        console.log(error.error?.message);
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


  handleAddBudgetSousEntiteAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    const dialogRef = this.matDialog.open(BudgetSousEntiteComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })

    const sub = dialogRef.componentInstance.onAddBudgetSousEntite.subscribe((response: any) => {
       this.tableDataBudgetSousEntite();
    })

  }

  handleEditBudgetSousEntite(value:any) {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="700px";
    dialogConfig.disableClose=true;
    dialogConfig.data= {
      action:'Edit',
      data: value
    }
    const dialogRef= this.matDialog.open(BudgetSousEntiteComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onEditBudgetSousEntite.subscribe((response:any)=>{
      this.tableDataBudgetSousEntite();
    })


  }


  getClass(statut:string){
    if(statut === 'Non-Debuter'){
      return 'nonDebuter';
    }
    else if(statut === 'Debuter'){
      return 'Debuter';
    }
    else{
      return 'Terminer';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
