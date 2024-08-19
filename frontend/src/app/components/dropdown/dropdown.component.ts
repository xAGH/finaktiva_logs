import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() label!: string;
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() selectedOption: string | null = null;
  @Input() errorMessage: string = '';
  @Input() invalid!: boolean;

  @Output() optionSelected = new EventEmitter<string>();

  isOpen = false;
  touched = false;
  showError = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.touched = true;
    }
  }

  onMouseLeaveOptions() {
    this.touched = true;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.optionSelected.emit(option);
  }
}
