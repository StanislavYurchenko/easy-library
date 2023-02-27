import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type Value = number;

@Component({
    selector: 'easy-library-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true
        }
    ]
})
export class DateComponent implements ControlValueAccessor {

    @Input() placeholder = '';

    @Input() min: Date | undefined;

    @Input() max: Date | undefined;

    @Output() changed = new EventEmitter<Value | null>();
    @Output() closed = new EventEmitter<void>();

    value: Value | null = null;
    isDisabled = false;

    get inputValue(): Date | null {
        return this.value ? new Date(this.value) : null;
    }

  private propagateChange: (fn: any) => void = (fn: any) => {};
  private propagateTouched: () => void = () => {};

    writeValue(value: Value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(event: MatDatepickerInputEvent<Date>): void {
        const value = event.value ? event.value.getTime() : null;

        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onClosed(): void {
        this.propagateTouched();
        this.closed.emit();
    }

}
