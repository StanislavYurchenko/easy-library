import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'easy-library-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() required = true;
  @Input() isInline = true;
  @Input() control: AbstractControl<any, any> | null = null;
  @Input() patternError!: string;

  constructor() {
    this.isInline = true;
  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return this.control && this.control.errors && Object.keys(this.control.errors)[0];
  }
}
