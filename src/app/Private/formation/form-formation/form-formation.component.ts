import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { AgentsService } from 'src/app/Services/agents.service';
import { CoutService } from 'src/app/Services/cout.service';
import { FormationService } from 'src/app/Services/formation.service';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { SessionService } from 'src/app/Services/session.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-form-formation',
  templateUrl: './form-formation.component.html',
  styleUrls: ['./form-formation.component.scss']
})
export class FormFormationComponent implements OnInit{

  onAddFormation = new EventEmitter();
  onEditFormation = new EventEmitter();
  formationForm: any = FormGroup;
  sessionForm: any = FormGroup;
  coutForm: any = FormGroup;
  dataSession:any;
  dataCout:any;
  responseMessage: any;
  organismes :any;
  visible=true;
dataSourcePersonnel :any;
dialogActon: any = 'Add';
action: any = 'Add';

constructor( 
  @Inject(MAT_DIALOG_DATA) public dialogData: any,
  private agentService:AgentsService,
  private organismeService: OrganismeService,
  private formBuilder: FormBuilder,
  private formationService: FormationService,
  private ngxService: NgxUiLoaderService,
  private messageService: MessageService,
  private dialogRef: MatDialogRef<FormFormationComponent>
  ){}

ngOnInit(): void {
  this.formationForm = this.formBuilder.group({
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
    this.dialogActon = 'Edit';
    this.action = 'Update';
    this.formationForm.patchValue(this.dialogData.data);
  }
  this.getOrganisme();
  this.tableDataPersonnel();
}

handleSubmit() {
  if (this.dialogActon === 'Edit') {
    this.edit();
  } else {
    this.add();
  }
}

getOrganisme(){
  this.organismeService.getAllOrganisme().subscribe((response:any)=>{
    this.organismes=response;
    console.log(response);
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

add() {
  this.ngxService.start();
  const formData = this.formationForm.value;
  const data = {
    avis: formData.avis,
    titre: formData.titre,
    objectif: formData.objectif,
    datePlan: formData.datePlan,
    categorieFormation: formData.categorieFormation,
    type: formData.type,
    idOrganisme: formData.idOrganisme,
    pays: formData.pays,
    ville: formData.ville,
    zone: formData.zone
  };
  this.formationService.addFormation(data).subscribe(
    (response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddFormation.emit();
      this.responseMessage = response.message;
      this.messageService.add({severity:'success',summary:'Success',detail:this.responseMessage});
      this.formationForm.reset();
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

edit() {
  this.ngxService.start();
  const formData = this.formationForm.value;
  const data = {
    idFormation: this.dialogData.data.idFormation,
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


tableDataPersonnel(){
  this.agentService.getAllPersonnel().subscribe((response:any)=>{
    this.ngxService.stop();
    //this.dataSource = new MatTableDataSource(response);
   this.dataSourcePersonnel = response;
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

close(){
    
  this.visible = false;
}

onhide(){
  this.formationForm.reset();
}

}
