import { Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: string;
  to: string;
}

@Component({
   selector: 'easy-library-date-range',
   templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Output() changed = new EventEmitter<Value>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
     this.form = this.fb.group({
        from: [null],
        to: [null]
    });
  }

  get from(): any {
    return this.form?.get('from');
  }

  get to(): any {
    return this.form?.get('to');
  }

  get min(): Date {
     return new Date(this.from.value);
  }

  get max(): Date {
     return new Date(this.to.value);
  }

  private propagateChange: (fn: any) => void = (fn: any) => {};
  private propagateTouched: () => void = () => {};

  writeValue(value: Value): void {
     this.form.patchValue(value || {});
  }

  registerOnChange(fn: any): void {
     this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
     this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
     if (isDisabled) {
        this.form.disable();
     } else {
        this.form.enable();
     }
  }

  onChanged(): void {
     const value = { ...this.form.value };

    this.propagateChange(value);
     this.changed.emit(value);
  }

  onClosed(): void {
     this.propagateTouched();
  }
}
