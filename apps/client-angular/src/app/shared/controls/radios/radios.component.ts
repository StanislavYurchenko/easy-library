import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { ControlItem, Value } from '@client-angular/models';

@Component({
   selector: 'easy-library-radios',
  templateUrl: './radios.component.html',
   styleUrls: ['./radios.component.scss'],
  providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => RadiosComponent),
      multi: true,
      },
  ]
})
export class RadiosComponent implements ControlValueAccessor {
  @Input() items: ControlItem[] = [];

  @Output() changed = new EventEmitter<Value>();

  value: Value | null = null;
  isDisabled = false;

  private propagateChange: (fn: any) => void = (fn: any) => {};

  writeValue(value: Value): void {
     this.value = value;
  }

  registerOnChange(fn: any): void {
     this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
     this.isDisabled = isDisabled;
  }

  onChanged(value: Value): void {
     this.value = value;
     this.propagateChange(value);
     this.changed.emit(value);
  }

  isChecked(value: Value): boolean {
    return this.value === value;
  }
}
