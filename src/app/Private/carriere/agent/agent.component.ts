import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MessageService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AgentsService } from 'src/app/Services/agents.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit,OnDestroy{

  private destroy$!: Subject<boolean>;
  onAddAgent = new EventEmitter();
  onEditAgent = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  dialogActon = 'Add';
  action = 'Add';
  visible=true;
  //genres: any;

  ngOnInit(): void {
   // this.genres = ['Feminin', 'Masculin'];
    this.registrationForm = this.formBuilder.group({
      nomprenom: this.formBuilder.control('',[Validators.required]),
      genre: this.formBuilder.control('',[Validators.required]),
      matricule: this.formBuilder.control('',[Validators.required]),
      unite: this.formBuilder.control('',[Validators.required]),
      emploi: this.formBuilder.control('',[Validators.required]),
      fonction: this.formBuilder.control('',[Validators.required]),
      categorie: this.formBuilder.control('',[Validators.required]),
      echelon: this.formBuilder.control('',[Validators.required]),
      dateEntreServ: this.formBuilder.control('',[Validators.required]),
      dateSortieServ: this.formBuilder.control('',[Validators.required])
    });
    this.destroy$ = new Subject<boolean>();

    if (this.dialogData.action === 'Edit') {
      this.dialogActon = 'Edit';
      this.action = 'Update';
      this.registrationForm.patchValue(this.dialogData.data);
    }

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private agentService: AgentsService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<AgentComponent>
  ) {}


  handleSubmit() {
    if (this.dialogActon === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      idPersonnel: this.dialogData.data.idPersonnel,
      nomprenom: formData.nomprenom,
      genre: formData.genre,
      matricule: formData.matricule,
      unite: formData.unite,
      emploi: formData.emploi,
      fonction: formData.fonction,
      categorie: formData.categorie,
      dateEntreServ: formData.dateEntreServ,
      dateSortieServ: formData.dateSortieServ,
      echelon: formData.echelon
    };
    this.agentService.updateAgent(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditAgent.emit();
        this.responseMessage = response.message;
         this.messageService.add({severity:'success',
         summary:'Success',detail:'Modification effectuer avec success.',life: 5000});
     
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'erro',summary:'Echec',detail:'Erreur de modification',life: 5000});
     
      }
    );
  }

  add() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      nomprenom: formData.nomprenom,
      genre: formData.genre,
      matricule: formData.matricule,
      unite: formData.unite,
      emploi: formData.emploi,
      fonction: formData.fonction,
      categorie: formData.categorie,
      dateEntreServ: formData.dateEntreServ,
      dateSortieServ: formData.dateSortieServ,
      echelon: formData.echelon,
    };
    this.agentService.addNewAgent(data).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.onAddAgent.emit();
        this.dialogRef.close();
        this.responseMessage = response.message;
        this.messageService.add({severity:'success',
        summary:'Success',detail:'Ajout effectuer avec success.',life: 5000});
    
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.messageService.add({severity:'error',
         summary:'Erreur',detail:'Echec de ajout ',life: 5000});
     
      }
    );
  }

  close(){
    
    this.visible = false;
  }

  onhide(){
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.registrationForm.reset();
  }

}
