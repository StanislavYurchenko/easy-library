import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { ControlItem, Value } from '@client-angular/models';

@Component({
  selector: 'easy-library-checkboxes',
   templateUrl: './checkboxes.component.html',
   styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => CheckboxesComponent),
      multi: true,
    },
  ]
})
export class CheckboxesComponent implements ControlValueAccessor {
  @Input() items: ControlItem[] = [];
  @Output() changed = new EventEmitter<Value[]>();

  value: Value[] = [];
  isDisabled = false;

  private propagateChange: (fn: any) => void = (fn: any) => {};

  writeValue(value: Value[]): void {
     this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, checked: boolean): void {
     const selected = this.getSelected(value, checked);

     this.value = selected;
    this.propagateChange(selected);
     this.changed.emit(selected);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
     const selected: Value[] = this.value ? [...this.value] : [];

     if (checked) {
        if (!selected.includes(value)) {
           selected.push(value);
        }
     } else {
        const index = selected.indexOf(value);

        selected.splice(index, 1);
    }

     return selected.length ? selected : [];
  }

  isChecked(value: Value): boolean {
     return this.value && this.value.includes(value);
  }
}
