import { Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'easy-library-value-accessor',
  templateUrl: './valueAccessor.component.html',
  styleUrls: ['./valueAccessor.component.scss'],
})
export class ValueAccessorComponent implements OnInit {

  form2!: FormGroup;
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      itemName: new FormControl(),
      isLocked: new FormControl({ value: false, disabled: false }),
    });
    this.form2 = this.fb.group({
      title: new FormControl(''),
      author: new FormControl(''),
      content: new FormControl('Your story...')
    });

    this.form.get('isLocked')?.valueChanges.subscribe(value => {
      value ? this.form.get('itemName')?.disable(): this.form.get('itemName')?.enable()
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
