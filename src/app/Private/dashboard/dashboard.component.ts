import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  constructor(
    private ngxService:NgxUiLoaderService,
    private dashboard: DashboardService,
    private messageService: MessageService
  ) { }

  private destroy$!: Subject<boolean>;
  dataSource:any;
  responseMessage:any;

  ngOnInit(): void {
    this.ngxService.start();
    this.destroy$ = new Subject<boolean>();
    this.tableData();
  }

  tableData(){
    this.dashboard.getDetails().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = response;
      console.log(response);
    },(error:any)=>{
      this.ngxService.stop();
       if(error.error?.message){
        this.responseMessage=error.error?.message;
        }else{
          this.responseMessage=error.error?.message;  
        }
       this.messageService.add({severity:'error',summary:'Dashboard',detail:'Une erreur est survenue!'});
    }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
