import {Component, Input} from '@angular/core';
import {FormGroup, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-valid-service',
  templateUrl: './valid-service.component.html',
  styleUrls: ['./valid-service.component.scss']
})
export class ValidServiceComponent {


  @Input() validationsError!: ValidationErrors[];
  @Input() entityField!: string;
  @Input() formGroup!: FormGroup;

  getErrorMessage(error : ValidationErrors | null){
    if (error) {
      if(error['required']){
        return "Ce champs est obligatoire" ;
      }
      else if(error['minlength']){
        return "Ce champs doit contenir au moins " + error['minlength']['requiredLength'] + " caractères"
      }
      else if (error['pattern']){
        return "Ce champs n'est pas valide"
      }
      else if (error['email']){
        return "Ce champs n'est pas valide"
      }
      else return ""
    }
    else return ""
  }


}
