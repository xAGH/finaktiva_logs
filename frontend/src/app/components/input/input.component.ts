import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label: string | null = null;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() type: string = 'text';
  @Input() max?: string;
  @Input() inputType: 'input' | 'textarea' = 'input';
  tabIndexValue: number | null = null;
  showError = false;

  getErrorMessage(): string {
    if (this.control.errors?.['required']) {
      return `${this.label ?? 'Field'} is required.`;
    }
    if (this.control.errors?.['minlength']) {
      return `${this.label ?? 'Field'} length must be greater than ${
        this.control.errors['minlength'].requiredLength
      }.`;
    }
    return '';
  }
}
