import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PlanningService } from 'src/app/Services/planning.service';
import { SalleService } from 'src/app/Services/salle.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { PlanningFormComponent } from './planning-form/planning-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy{

  
  private destroy$!: Subject<boolean>;
  visibleFormation = false;
  visibleEvenement = false;
  responseMessage: any;
  dialogActon = 'Add';
  evenements: any;
  PlanningFormationForm!: FormGroup;
  PlanningEvenementForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private evenementService: PlanningService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private router:Router,
    private matDialog: MatDialog){}
  
  ngOnInit(): void { 
    this.getAllEvenement();
    this.PlanningEvenementForm = this.formBuilder.group({
      evenement: this.formBuilder.control('',[Validators.required]),
      color:  this.formBuilder.control('',[Validators.required]),
      idSalle:  this.formBuilder.control('',[Validators.required]),
      dateDebut:  this.formBuilder.control('',[Validators.required]),
      dateFin: this.formBuilder.control('',[Validators.required]),
      heureDebut: this.formBuilder.control('',[Validators.required]),
      heureFin: this.formBuilder.control('',[Validators.required])
    });
    this.PlanningFormationForm = this.formBuilder.group({
      titre: this.formBuilder.control('',[Validators.required]),
      color:  this.formBuilder.control('',[Validators.required]),
      dateDebut:  this.formBuilder.control('',[Validators.required]),
      dateFin: this.formBuilder.control('',[Validators.required])
    });
    this.destroy$ = new Subject<boolean>();
    
  }

  getAllEvenement(){
    this.evenementService.getAllPlannifier().pipe(takeUntil(this.destroy$)).subscribe((response:any)=>{
      this.evenements = response;
      console.log("traitement planning");
      console.log(response);
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

  calendarOption: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interaction],
    locale: 'fr',
    headerToolbar:{
      start:'prev,next today',
      center: 'title',
      end:'dayGridMonth,dayGridWeek'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine'
    },
    dateClick: this.handleDateClick.bind(this),
    events:[
      {title:'Renion', date:'2023-07-17'},
    {title:'Renion Plannification Plan de Formation', start:'2023-07-03', end:'2023-07-07', color:'orange'},
    {title:'Soutenance',date:'2023-07-24', color:'red'}
    ],
    nowIndicator: true,
    editable: true

  }

  handleDateClick(args:any){
    alert('date click ' +args.dateStr);
  }


  handleAddAction() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action:'Add'
    }
    dialogConfig.width="750px";
    dialogConfig.disableClose=true;
    const dialogRef= this.matDialog.open(PlanningFormComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub= dialogRef.componentInstance.onAddEvenement.subscribe((response:any)=>{
      this.getAllEvenement();
    })

  }


/*   close(){
    this.visibleEvenement = false;
    this.visibleFormation = false;
  }


  onHide(){
    this.PlanningFormationForm.reset();
    this.PlanningEvenementForm.reset();
  } */


  ngOnDestroy(): void {
    this.destroy$.next(true);
  }



}
