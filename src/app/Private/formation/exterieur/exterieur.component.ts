import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem, MessageService } from 'primeng/api';
import { AgentsService } from 'src/app/Services/agents.service';
import { CoutService } from 'src/app/Services/cout.service';
import { FormationService } from 'src/app/Services/formation.service';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { SessionService } from 'src/app/Services/session.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-exterieur',
  templateUrl: './exterieur.component.html',
  styleUrls: ['./exterieur.component.scss']
})
export class ExterieurComponent implements OnInit{

  items!: MenuItem[];
    

 /*    formationForm: any = FormGroup;
    sessionForm: any = FormGroup;
    coutForm: any = FormGroup;
    dataSession:any;
    dataCout:any;
    responseMessage: any;
    organismes :any;
  dataSourcePersonnel :any;

  constructor(private agentService:AgentsService,
    private organismeService: OrganismeService,
    private sessionService: SessionService,
    private coutService: CoutService,
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService, ){} */

  ngOnInit(): void {
      this.items = [
      {
        label: 'Ajouter Formation',
        routerLink: 'formationForm'
      },
      {
        label: 'Gerer Session',
        routerLink: 'session'
      },
      {
        label: 'Gerer Agent',
        routerLink: 'agent'
      },
      {
        label: 'Gerer Couts',
        routerLink: 'couts'
      }
    ];
  /*   this.formationForm = this.formBuilder.group({
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
    this.getOrganisme();
    this.tableDataPersonnel(); */
  }

/*   handleSubmit() {
 this.add();
  } */

/*   getOrganisme(){
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
  } */

/*   add() {
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
  } */

  
/*   tableDataPersonnel(){
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
  } */


}
