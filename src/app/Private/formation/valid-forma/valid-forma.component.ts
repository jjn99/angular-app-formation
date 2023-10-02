import { Component, Input } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-valid-forma',
  templateUrl: './valid-forma.component.html',
  styleUrls: ['./valid-forma.component.scss']
})
export class ValidFormaComponent {

  
  @Input() validationsError!: ValidationErrors[];
  @Input() entityField!: string;
  @Input() formGroup!: FormGroup


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
