import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'easy-library-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> PasswordInputComponent),
    multi: true,
  }],
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() public parenForm: FormGroup | null = null;
  @Input() public fieldName!: string;
  @Input() public label!: string;

  value!: string;
  changed!: (value: string) => void;
  touched!: () => void;
  isDisabled!: boolean;
  passwordFieldType = 'password';
  hide = true;

  get formField(): FormControl {
    return this.parenForm?.get(this.fieldName) as FormControl;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  onChange(evt: Event): void {
    const value = (<HTMLInputElement>evt.target).value;

    this.changed(value);
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  public togglePasswordVisible (): void {
    this.passwordFieldType =
      this.passwordFieldType === 'text'
        ? 'password'
        : 'text';
  }
}


