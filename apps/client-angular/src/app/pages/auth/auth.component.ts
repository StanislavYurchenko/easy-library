import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors } from '../../shared/utils/regex';
import { NotificationService } from '../../services/notification/notification.service';
import { markFormGroupTouched } from '../../shared';

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

  get input(): AbstractControl<any, any> | null {
    return this.form?.get('input');
  }

  get password(): AbstractControl<any, any> | null {
    return this.form?.get('password');
  }

  constructor(private fb: FormBuilder, private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [
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
        },
      ],
    });
  }

  onSubmit(): void {
    console.log('Submit!');

    if (!this.form.valid) {
      markFormGroupTouched(this.form);
    }
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 123,
      password: 'qwerty',
      });
  }

  onToggleDisable(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }

  onError(): void {
    this.notification.error('Oops! Something is wrong');
  }
}
