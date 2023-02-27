import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isInline: boolean;
  regexErrors = regexErrors;

  items: ControlItem[];

  showSpinner = false;

  get input(): any {
    return this.form?.get('input');
  }

  constructor(private fb: FormBuilder, private notification: NotificationService) {
    this.isInline = true;

    this.items = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
      { label: 'Fourth', value: 4 },
      { label: 'Fifth', value: 5 }
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [
            null,
            {
               updateOn: 'blur',
               validators: [Validators.required, Validators.minLength(3), Validators.pattern(regex.numbers)]
        }
      ],
      password: [
            null,
            {
               updateOn: 'blur',
               validators: [Validators.required]
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
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2019, 5, 10).getTime(),
        to: new Date(2019, 5, 25).getTime()
      }
      });
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

  onToggleDisable(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }

  onError(): void {
    this.notification.error('Oops! Something is wrong');
  }
}
