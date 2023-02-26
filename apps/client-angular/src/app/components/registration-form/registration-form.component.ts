import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidators, UniversalValidators } from 'ngx-validators';

export interface RegistrationRequestModel {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'easy-library-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationFrom!: FormGroup;

  get favouriteHexCodeValue (): string {
    return this.registrationFrom.get( 'favouriteHexCode' )?.value;
  }


  ngOnInit(): void {
    this.generateRegistrationForm();
    this.registrationFrom.get('isLocked')?.valueChanges.subscribe(value => {
      value ? this.registrationFrom.get('name')?.disable(): this.registrationFrom.get('name')?.enable();
      value ? this.registrationFrom.get('email')?.disable(): this.registrationFrom.get('email')?.enable();
    });
  }


  public generateRegistrationForm (): void {
    this.registrationFrom =
      new FormGroup( {
        name: new FormControl(
          '',
          {
            validators: [
              Validators.required,
              UniversalValidators.noEmptyString
            ]
          }
        ),
        email: new FormControl(
          '',
          {
            validators: [
              Validators.required,
              EmailValidators.normal
            ]
          }
        ),
        isLocked: new FormControl({ value: false, disabled: false }),
        password: new FormControl(
          '',
          {
            validators: [
              Validators.required,
              UniversalValidators.noWhitespace
            ]
          }
        ),
        favouriteHexCode: new FormControl( '' )
      });
  }

  public submitRegistrationForm (): void {
    if ( this.registrationFrom.valid ) {
      const registrationRequest: RegistrationRequestModel = {
        ...this.registrationFrom.value
      };

      // Success 🎉
      console.log( { registrationRequest } );
    }
  }
}
