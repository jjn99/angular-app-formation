import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-gest-session',
  templateUrl: './gest-session.component.html',
  styleUrls: ['./gest-session.component.scss']
})
export class GestSessionComponent implements OnInit{
 
 dispayedColumn: string[] = ['idSession','dateDepart','dateRetour','dateSessionDebut','dateSessionFin','action'];
  dataSource :any;
  responseMessage:any;
  visibility = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb:FormBuilder,
    private sessionServie: SessionService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private messageService:MessageService,
    private router:Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = this.dialogData.sessions;
  }



}
