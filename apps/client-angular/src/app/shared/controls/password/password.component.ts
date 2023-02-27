import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
    selector: 'easy-library-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordComponent),
            multi: true
        }
    ]
})
export class PasswordComponent implements ControlValueAccessor {

    @Input() placeholder: string = '';

    @Output() changed = new EventEmitter<string>();

    value = '';
    isDisabled = false;
    passwordType: PasswordType;

    constructor() {
        this.passwordType = 'password';
    }

    private propagateChange: (fn: any) => void = (fn: any) => {};
    private propagateTouched: () => void = () => {};

    writeValue(value: string): void {
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

    onKeyup(evt: Event): void {
        this.value = (<HTMLInputElement>evt.target).value;
        this.propagateChange(this.value);
        this.changed.emit(this.value);
    }

    onBlur(): void {
        this.propagateTouched();
    }

    togglePassword(): void {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    }

}
