import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { FormationService } from 'src/app/Services/formation.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-form-couts',
  templateUrl: './form-couts.component.html',
  styleUrls: ['./form-couts.component.scss']
})
export class FormCoutsComponent implements OnInit{

  dataSource:any;
  cols!: any;
  Couts!:any;
  responseMessage:any;

  constructor( private formationService: FormationService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService){}

  ngOnInit(): void {
    this.cols = [
      { field: 'designation', header: 'Designation' },
      { field: 'prix', header: 'Coût Unitaire' },
      { field: 'quantite', header: 'Quantite' },
      { field: 'nbrParticipant', header: 'Nombre Participant' },
      { field: 'montant', header: 'Montant' }

    ];
    this.tableData();
  }

  tableData(){
    this.formationService.getAllFormation().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = response;
        console.log(this.dataSource);
      },(error:any)=>{
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


}
