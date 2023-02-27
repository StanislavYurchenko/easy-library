import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {catchError, EMPTY} from 'rxjs';
import { regex, regexErrors } from '../../shared/utils/regex';
import { NotificationService } from '../../services/notification/notification.service';
import { markFormGroupTouched } from '../../shared';
import { AuthService } from '../../services';
import {IAuthResponse} from "../../models";

export type Value = number | string | boolean;
export interface Icon {
  src: string;
  cssClass: string;
}
export interface ControlItem {
  value: Value;
  label: string;
  icon?: Icon;
}
@Component({
  selector: 'easy-library-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form!: FormGroup;
  regexErrors = regexErrors;

  get email(): AbstractControl<any, any> | null {
    return this.form?.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.form?.get('password');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
            null,
            {
               updateOn: 'blur',
               validators: [Validators.required, Validators.minLength(3), Validators.pattern(regex.email)]
        }
         ],
      password: [
            null,
            {
               updateOn: 'blur',
               validators: [Validators.required, Validators.pattern(regex.password)]
        }
         ],
    });
  }

  signIn(): void {

    const email = String(this.form?.get('email')?.value);
    const password = String(this.form?.get('password')?.value);
    console.log('email', email);

    this.authService
      .login(email, password)
      .pipe(
        catchError(() => {
          this.onError();

          return EMPTY;
      }))
      .subscribe((res: IAuthResponse) => {
            localStorage.setItem('login', res.access_token);
            this.onSuccess();
         });
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 123,
      password: 'qwerty',
      });
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }

  onError(): void {
    this.notification.error('Oops! Something is wrong');
  }
}
