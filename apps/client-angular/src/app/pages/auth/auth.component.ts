import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { regex, regexErrors } from '../../shared/utils/regex';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthService } from '../../services';

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
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  regexErrors = regexErrors;

  private readonly subscription = new Subscription();

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
          validators: [Validators.required, Validators.minLength(3), Validators.pattern(regex.email)],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(regex.password)],
        },
      ],
    });
  }

  signIn(): void {
    const authSub = this.authService.login(this.form?.value).subscribe();

    this.subscription.add(authSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
