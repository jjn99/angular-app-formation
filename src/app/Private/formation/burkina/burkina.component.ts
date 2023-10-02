import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MenuItem, MessageService} from "primeng/api";
import { AgentsService } from 'src/app/Services/agents.service';
import { FormationService } from 'src/app/Services/formation.service';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { SessionService } from 'src/app/Services/session.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-burkina',
  templateUrl: './burkina.component.html',
  styleUrls: ['./burkina.component.scss']
})
export class BurkinaComponent implements OnInit{

  
  onAddFormation = new EventEmitter();
  onEditFormation = new EventEmitter();
  registrationForm: any = FormGroup;
  responseMessage: any;
  
  dataSource :any;
  organismes :any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private organismeService: OrganismeService,
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<BurkinaComponent>
  ) { 
  }

  ngOnInit(): void {
    console.log(this.dialogData.data)
    this.registrationForm = this.formBuilder.group({
      avis: this.formBuilder.control('',[Validators.required]),
      titre:  this.formBuilder.control('',[Validators.required]),
      objectif:  this.formBuilder.control(''),
      datePlan:  this.formBuilder.control('',[Validators.required]),
      categorieFormation:  this.formBuilder.control('',[Validators.required]),
      type:  this.formBuilder.control('',[Validators.required]),
      idOrganisme: this.formBuilder.control('',[Validators.required]),
      ville:  this.formBuilder.control('',[Validators.required]),
      pays:  this.formBuilder.control('',[Validators.required]),
      zone:  this.formBuilder.control('',[Validators.required])
    });
     if (this.dialogData.action === 'Edit') {
      this.registrationForm.patchValue(this.dialogData.data);
    } 
    this.getOrganisme();
  }


  getOrganisme(){
    this.organismeService.getAllOrganisme().subscribe((response:any)=>{
      this.organismes=response;
    },(error:any)=>{
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.messageService.add({severity:'error',summary:'Echec',detail:this.responseMessage});
     
    }
    )
  }

   edit() {
    this.ngxService.start();
    const formData = this.registrationForm.value;
    const data = {
      numeroInscription: this.dialogData.data.numeroInscription,
      avis: formData.avis,
      titre: formData.titre,
      objectif: formData.objectif,
      categorieFormation: formData.categorieFormation,
      type: formData.type,
      idOrganisme: formData.idOrganisme,
      pays: formData.pays,
      zone: formData.zone,
      ville: formData.ville
    };
    this.formationService.updateFormation(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditFormation.emit();
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




}
