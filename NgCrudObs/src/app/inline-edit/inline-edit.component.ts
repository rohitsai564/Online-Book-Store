import { Component, Input, ViewChild, Renderer2, forwardRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.css']
})

export class InlineEditComponent implements ControlValueAccessor {
  @Input() label = 'Enter value here';
  @Input() required = true;
  private value1 = '';
  private preValue = '';
  editing = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any {
    return this.value1;
  }

  set value(v: any) {
    if (v !== this.value1) {
      this.value1 = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this.value1 = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onBlur($event: Event) {
    this.editing = false;
    if ( this.value1 === '') {
      this.value1 = 'No value available';
    }
  }

  beginEdit(value: any) {
    this.preValue = value;
    this.editing = true;
  }
}
